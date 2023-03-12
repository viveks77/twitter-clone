import { User } from "../../user/model/user";
import { Field, ObjectType } from "type-graphql";
import { TweetImages } from "./images";
import { Comment } from "../../comment/model/comment";

@ObjectType()
class Count {

    @Field(() => Number, {defaultValue: 0})
    likes: number

    @Field(() => Number, {defaultValue: 0})
    comments: number;
}

@ObjectType()
export class Tweet {

    @Field(() => Number)
    id: number;

    @Field()
    content: string;

    @Field(() => User, {nullable: true})
    user?: User;

    @Field(() => Number)
    userId: number;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Boolean, {defaultValue: false})
    isLiked?: boolean;

    @Field(() => [TweetImages], {nullable: true})
    image: TweetImages[] | null;

    @Field(() => [Comment], {nullable: true})
    comments?: Comment[] | null;

    @Field(() => Count)
    _count: Count;
    
}


