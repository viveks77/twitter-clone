import { AuthenticationError } from "apollo-server-core";
import { Context } from "src/common/models/context";
import { MiddlewareFn } from "type-graphql";

export const isAuthenticated:MiddlewareFn<Context> = ({context}, next) => {
    
    if(!context.req.session.userId){
        throw new AuthenticationError("Not Authenticated");
    }
    
    return next();
}