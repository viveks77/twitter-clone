import { Context } from "../../../common/models/context";
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { CommentDTO } from "../DTO/commentDTO";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { saveToLocal } from "../../../common/helpers/helpers";
import { Comment } from "../model/comment";
import { User } from "../../user/model/user";
import { isAuthenticated } from "../../../middleware/authMiddleware";

@Resolver(Comment)
export class CommentResolver {
    
    @FieldResolver(() => User)
    async user(@Root() comment: Comment, @Ctx() { prisma, req }: Context): Promise<User | null> {
        
        const user = await prisma.user.findFirst({
            where: {
                id: comment.userId,
            },
            include: {
                avatar: true,
                _count: {
                    select: {
                        followers: true,
                        followings: true,
                    },
                },
            },
        }) as User;

        if(!user) return null;
        
        let isFollower = await prisma.follow.findFirst({
            where: {
                userId: req.session.userId,
                followerId: user.id,
            },
        });

        user.isFollowing = isFollower ? true : false;
        user.isMe = user.id == req.session.userId;

        return user;
    }

    @Mutation(() => Comment)
    @UseMiddleware(isAuthenticated)
    async createComment(
        @Arg("commentDto") commentDto: CommentDTO,
        @Arg("file", () => GraphQLUpload, { nullable: true }) files: FileUpload,
        @Ctx() { req, prisma }: Context
    ) {
        const userId = req.session.userId;
        try {
            const comment = await prisma.comment.create({
                data: {
                    ...commentDto,
                    userId: userId,
                },
                include: {
                    image: true,
                    user: true,
                    _count: {
                        select: {
                            likes: true,
                        },
                    },
                },
            });

            if (files) {
                const fileName = await saveToLocal(files);

                const image = await prisma.images.create({
                    data: {
                        filename: fileName,
                        commentId: comment.id,
                    },
                });

                comment.image.push(image);
            }

            return comment;
        } catch (e) {
            return null;
        }
    }
}
