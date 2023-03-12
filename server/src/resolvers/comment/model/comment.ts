import { User } from "../../user/model/user";
import { Field, ObjectType } from "type-graphql";
import { CommentImages } from "./commentImages";
import { Tweet } from "../../tweet/model/tweet";

@ObjectType()
class CommentCount {

    @Field(() => Number, {defaultValue: 0})
    likes: number

}

@ObjectType()
export class Comment {
    
    @Field(() => Number)
    id: number;

    @Field()
    content: string;

    @Field(() => User, {nullable: true})
    user?: User;

    @Field(() => Number)
    userId: number;

    @Field(() => Number, {nullable: true})
    tweetId?: number;

    @Field(() => Tweet, {nullable: true})
    tweet?: Tweet;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Boolean, {defaultValue: false})
    isLiked?: boolean;

    @Field(() => [CommentImages], {nullable: true})
    image: CommentImages[] | null;
    
    @Field(() => CommentCount)
    _count: CommentCount;
}