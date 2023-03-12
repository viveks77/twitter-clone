import { Follow } from "@prisma/client";
import {
    Arg,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root
} from "type-graphql";
import { Context } from "../../../common/models/context";
import { User } from "../model/user";

@Resolver(User)
export class UserResolver {
    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() { req }: Context) {
        // this is the current user and its ok to show them their own email
        if (req.session.userId === user.id) {
            return user.email;
        }
        // current user wants to see someone elses email
        return "";
    }

    @Query(() => [User])
    async getSuggestedUsers(
        @Ctx(){ req, prisma }: Context
    ):Promise<User[] | null>{
        const userId = req.session.userId;
        const usersCount = await prisma.user.count();
        const skip = Math.floor(Math.random() * usersCount);
        try{
            const followingUsers = await prisma.follow.findMany({
                where: {
                    userId : userId
                }
            });

            const excludedUsers = followingUsers.map((user: Follow) => user.followerId);

            excludedUsers.push(userId);

            const users = await prisma.user.findMany({
                where: {
                    NOT : {
                        id: {
                            in: excludedUsers
                        }
                    }
                },
                include: {
                    avatar: true,
                    _count: {
                        select: {
                            followers: true,
                            followings: true
                        }
                    }
                },
                skip: skip,
                take: 3,
            });
            return users;
        }catch(e){
            console.log(e);
            return null;
        }
    }


    @Mutation(() => Boolean)
    async followUser(
        @Arg('id') followerId: number,
        @Ctx() {prisma, req}: Context
    ){
        const userId = req.session.userId;
        try{
            const follow = await prisma.follow.create({
                data: {
                    userId: userId,
                    followerId: followerId
                }
            });
            return follow ? true : false;
        }catch(e){
            console.log('error', e);
            return false;
        }
    }


    @Mutation(() => Boolean)
    async unfollowUser(
        @Arg('id') followerId: number,
        @Ctx() {prisma, req}: Context
    ){
        const userId = req.session.userId;
        try{
            const deleteObj = await prisma.follow.findFirst({
                where: {
                    userId: userId,
                    followerId: followerId
                }
            })
            if(!deleteObj) throw 'No Such object';

            const isDelete = await prisma.follow.delete({
                where: {
                    id: deleteObj?.id   
                }
            });
            
            return isDelete ? true : false;
        }catch(e){
            console.log(e);
            return null;
        }
    }
}

