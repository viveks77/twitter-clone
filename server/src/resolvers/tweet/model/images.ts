import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TweetImages{
    @Field(() => String)
    filename: string;
}