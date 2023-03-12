import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Avatar {
    @Field({nullable: true})
    filename: String;
}