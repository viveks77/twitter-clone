import { Field, ObjectType } from "type-graphql";
import { Avatar } from "../../user/model/avatar";

@ObjectType()
export class UserResponse{
    
    @Field(() => String)
    username: string;

    @Field(() => String)
    email: string;

    @Field(() => Avatar, {nullable: true})
    avatar?: Avatar | null;

    @Field(() =>  String)
    firstName: string;

    @Field(() => String)
    lastName: string;

    @Field(() => String, {nullable: true})
    bio?: string;
}

@ObjectType()
export class FieldError{
    @Field(() => String)
    field: string;

    @Field(() => String, {nullable: true})
    message?: string;
}

@ObjectType()
export class ResponseDto{
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => UserResponse, {nullable: true})
    user?: UserResponse;
}