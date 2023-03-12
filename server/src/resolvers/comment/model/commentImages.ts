import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CommentImages{
    @Field(() => String)
    filename: string;
}