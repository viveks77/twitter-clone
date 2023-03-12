import { Tweet } from "../../tweet/model/tweet";
import { Field, ObjectType } from "type-graphql";
import { Avatar } from './avatar';

@ObjectType()
export class FollowCount {
    @Field(() => Number, {defaultValue: 0})
    followers: number;

    @Field(() => Number, {defaultValue: 0})
    followings: number;
}


@ObjectType()
export class User{
    @Field(() => Number)
    id: number;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({nullable: true})
    bio?: string;

    @Field(() => [Tweet], {nullable: true})
    tweets?: Tweet[];

    @Field(() => Avatar, {nullable: true})
    avatar?:  Avatar | null;

    @Field(() => FollowCount, {nullable: true})
    _count?: FollowCount;

    @Field(() => Boolean, {nullable: true})
    isFollowing?: boolean;

    @Field(() => Boolean, {nullable: true})
    isMe?: boolean;

}