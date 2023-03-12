import { Prisma } from "@prisma/client";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { mapFieldErrors, saveToLocal } from "../../../common/helpers/helpers";
import { Context } from "../../../common/models/context";
import { isAuthenticated } from "../../../middleware/authMiddleware";
import { User } from "../../user/model/user";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import validator from "validator";
import { LoginDto } from "../DTO/loginDto";
import { ResponseDto, FieldError, UserResponse } from "../DTO/responseDto";
import { UserDto } from "../DTO/userDto";
import argon from "argon2";

@Resolver()
export class AuthResolver {
    @Mutation(() => ResponseDto)
    async register(
        @Arg("registerDto") registerDto: UserDto,
        @Ctx() { req, prisma }: Context
    ): Promise<ResponseDto | undefined> {
        let user: Prisma.UserCreateInput;
        if (!validator.isEmail(registerDto.email)) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "Please input a valid email.",
                    },
                ],
            };
        }

        if (!validator.isLength(registerDto.password, { min: 4, max: undefined })) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Please input a password of length greater than 4.",
                    },
                ],
            };
        }

        try {
            user = {
                ...registerDto,
                password: await argon.hash(registerDto.password),
            };
            const createdUser = await prisma.user.create({ data: user });
            req.session.userId = createdUser.id;

            return {
                user: createdUser,
            };
        } catch (e) {
            console.log(e.code);
            if (e.code === "P2002") {
                let errors: FieldError[] = mapFieldErrors(e);
                return { errors };
            }

            return {
                errors: [
                    {
                        field: "",
                        message: "Something went wrong.",
                    },
                ],
            };
        }
    }

    @Mutation(() => ResponseDto)
    async login(
        @Arg("loginDto") loginDto: LoginDto,
        @Ctx() { req, prisma }: Context
    ): Promise<ResponseDto | undefined> {
        if (!validator.isEmail(loginDto.email)) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "Please input a valid email.",
                    },
                ],
            };
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: loginDto.email,
                },
            });

            if (!user) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "No such user exists",
                        },
                    ],
                };
            }

            const isMatch = await argon.verify(user?.password, loginDto.password);
            if (!isMatch) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "Incorrect Password",
                        },
                    ],
                };
            }

            req.session.userId = user.id;
            return {
                user: user,
            };
        } catch (e) {
            return {
                errors: [
                    {
                        field: "",
                        message: "Something went wrong.",
                    },
                ],
            };
        }
    }

    @Query(() => User)
    @UseMiddleware(isAuthenticated)
    async getLoggedInUser(@Ctx() { req, prisma }: Context): Promise<User | null> {
        const userId = req.session.userId;
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    avatar: true,
                    tweets: {
                        include: {
                            image: true,
                            user: true,
                            likes: true,
                            _count: {
                                select: {
                                    likes: true,
                                    comments: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
            });

            return user;
        } catch (e) {
            return null;
        }
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { req, res }: Context): Promise<Boolean | undefined> {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie("qid");
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        );
    }

    @Query(() => Boolean)
    async isAuthenticated(@Ctx() { req }: Context): Promise<Boolean | undefined> {
        return !!req.session.userId;
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuthenticated)
    async updateUser(
        @Arg("user") user: UserDto,
        @Arg("avatar", () => GraphQLUpload, { nullable: true }) avatar: FileUpload,
        @Ctx() { req, prisma }: Context
    ): Promise<UserResponse | null> {
        try {
            const userId = req.session.userId;
            const updatedUser = await prisma.user.update({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    bio: user.bio,
                },
                where: {
                    id: userId,
                },
                include: {
                    avatar: true,
                },
            });

            if (avatar) {
                const fileName = await saveToLocal(avatar);
                const avatarImage = await prisma.avatar.upsert({
                    where: {
                        userId: userId,
                    },
                    create: {
                        filename: fileName,
                        userId: userId,
                    },
                    update: {
                        filename: fileName,
                    },
                });
                updatedUser.avatar = avatarImage;
            }

            return updatedUser;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
