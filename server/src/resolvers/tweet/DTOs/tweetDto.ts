import { Field, InputType } from "type-graphql";

@InputType()
export class TweetDto{

    @Field({nullable: true})
    content: string;
    
}