import { Field, ID } from "type-graphql";

export class BaseModel {
    @Field(() => ID)
    id: number;

    @Field(() => String)
    createdAt: Date;

}