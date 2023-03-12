import { Field, InputType } from "type-graphql";

@InputType()
export class UserDto{
    @Field()
    username: string;

    @Field()
    email: string;

    @Field({nullable: true})
    password: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({nullable: true})
    bio: string;
}