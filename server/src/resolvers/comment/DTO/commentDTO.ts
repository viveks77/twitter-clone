import { Field, InputType } from "type-graphql";

@InputType()
export class CommentDTO{

    @Field({nullable: true})
    content: string;

    @Field(() => Number)
    tweetId: number;
    
}