import {
    Arg,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { Context } from "../../../common/models/context";
import { isAuthenticated } from "../../../middleware/authMiddleware";
import { TweetDto } from "../DTOs/tweetDto";
import { Tweet } from "../model/tweet";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { saveToLocal } from "../../../common/helpers/helpers";
import { Follow } from "@prisma/client";
import { User } from "../../user/model/user";

@Resolver(Tweet)
export class TweetResolver {
    @FieldResolver(() => User)
    async user(@Root() tweet: Tweet, @Ctx() { prisma, req }: Context): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                id: tweet.userId,
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

    @Query(() => [Tweet], { nullable: true })
    @UseMiddleware(isAuthenticated)
    async getExplore(@Ctx() { req, prisma }: Context): Promise<Tweet[] | undefined | null> {
        const userId = req.session.userId;
        try {
            const tweetsObj = await prisma.tweet.findMany({
                include: {
                    image: true,
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        },
                    },
                    likes: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            const tweets = tweetsObj.map((tweet) => {
                const isLiked = tweet.likes.find((ele) => ele.userId === userId);
                return {
                    ...tweet,
                    isLiked: isLiked ? true : false,
                };
            });
            return tweets;
        } catch (e) {
            console.log("error", e);
            return null;
        }
    }

    @Query(() => [Tweet], { nullable: true })
    @UseMiddleware(isAuthenticated)
    async getFeed(@Ctx() { req, prisma }: Context) {
        const userId = req.session.userId;
        try {
            const followingUsers = await prisma.follow.findMany({
                where: {
                    userId: userId,
                },
            });

            const following = followingUsers.map((user: Follow) => user.followerId);
            following.push(userId);

            const tweetsObj = await prisma.tweet.findMany({
                where: {
                    userId: {
                        in: following,
                    },
                },
                include: {
                    image: true,
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        },
                    },
                    likes: true,
                    comments: {
                        where: {
                            userId: userId
                        },
                        include: {
                            image: true,
                            user: {
                                include: {
                                    avatar: true,
                                    
                                }
                            },
                            _count: {
                                select: {
                                    likes: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        take: 1
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            const tweets = tweetsObj.map((tweet) => {
                const isLiked = tweet.likes.find((ele) => ele.userId === userId);
                return {
                    ...tweet,
                    isLiked: isLiked ? true : false,
                };
            });

            return tweets;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    @Mutation(() => Tweet, { nullable: true })
    @UseMiddleware(isAuthenticated)
    async createTweet(
        @Arg("tweetDto", { nullable: true }) tweetDto: TweetDto,
        @Arg("file", () => GraphQLUpload, { nullable: true }) files: FileUpload,
        @Ctx() { req, prisma }: Context
    ): Promise<Tweet | null | undefined> {
        const userId = req.session.userId;
        try {
            const tweet = await prisma.tweet.create({
                data: {
                    ...tweetDto,
                    userId: userId
                },
                include: {
                    user: true,
                    image: true,
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        },
                    },
                    likes: true,
                },
            });

            if (files) {
                const fileName = await saveToLocal(files);

                const image = await prisma.images.create({
                    data: {
                        filename: fileName,
                        tweetId: tweet.id,
                    },
                });

                tweet.image.push(image);
            }
            return tweet;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    @Query(() => Tweet)
    @UseMiddleware(isAuthenticated)
    async getTweets(
        @Arg('id', {nullable: true}) id: number,
        @Ctx() {req, prisma}: Context
    ){
        try{
            let userId;
            if(id){
                userId = id;
            }else{
                userId = req.session.userId;
            }

            const tweets = await prisma.tweet.findMany({
                where: {
                    userId: userId
                },
                include: {
                    image: true,
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        },
                    },
                    likes: true,
                    comments: {
                        where: {
                            userId: userId
                        },
                        include: {
                            image: true,
                            user: {
                                include: {
                                    avatar: true,
                                    
                                }
                            },
                            _count: {
                                select: {
                                    likes: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        take: 1
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return tweets;
        }catch(e){
            console.log(e);
            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuthenticated)
    async deleteTweet(
        @Arg("id") tweetId: number,
        @Ctx() { req, prisma }: Context
    ): Promise<Boolean> {
        const userId = req.session.userId;
        try {
            const { count } = await prisma.tweet.deleteMany({
                where: {
                    id: tweetId,
                    userId: userId,
                },
            });

            return count === 1 ? true : false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuthenticated)
    async likeTweet(
        @Arg("tweetId") tweetId: number,
        @Ctx() { req, prisma }: Context
    ): Promise<Boolean> {
        const userId = req.session.userId;
        try {
            await prisma.like.create({
                data: {
                    userId: userId,
                    tweetId: tweetId,
                },
            });

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuthenticated)
    async removeTweetLike(
        @Arg("tweetId") tweetId: number,
        @Ctx() { req, prisma }: Context
    ): Promise<Boolean> {
        const userId = req.session.userId;
        try {
            const like = await prisma.like.findFirst({
                where: {
                    userId: userId,
                    tweetId: tweetId,
                },
            });

            if (!like) return false;

            await prisma.like.delete({
                where: {
                    id: like.id,
                },
            });

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
