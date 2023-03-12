import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createUploadLink } from "apollo-upload-client";
import withApollo from "./withApollo";

const createClient = (ctx: NextPageContext | undefined) => 
    new ApolloClient({
        link: createUploadLink({
            uri: "http://127.0.0.1:4000/graphql",
            headers: {
                cookie: (typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined) || ""
            },
            fetch,
            fetchOptions: {credentials: 'include'},
        }),
        credentials: 'include',
        cache: new InMemoryCache()
    });
 
export const withApolloClient = withApollo(createClient);