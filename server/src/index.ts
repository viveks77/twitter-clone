import { ApolloServer } from "apollo-server-express";
import express from "express";
import connectRedis from 'connect-redis';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user/resolver/userResolver";
import cors from 'cors';
import { createClient } from "redis";
import session from "express-session";
import { createContext } from "./common/helpers/createContext";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground";
import { TweetResolver } from "./resolvers/tweet/resolver/tweetResolver";
import {graphqlUploadExpress} from 'graphql-upload';
import path from "path";
import { AuthResolver } from "./resolvers/auth/resolver/authResolver";
import { CommentResolver } from "./resolvers/comment/resolver/commentResolver";

const PORT = process.env.PORT || 4000;
var dir = path.join(__dirname, '../public');

const main = async () => {
    const app = express();
    const RedisStore = connectRedis(session);
    let redisClient = createClient({legacyMode: true, url: process.env.REDIS_URL});
    redisClient.connect().catch(console.error);

    app.use(session({
        name: "qid",
        store: new RedisStore({client: redisClient as any, disableTouch: true}),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: false,
        },
        secret: process.env.COOKIE_SECRET as string,
        saveUninitialized: false,
        resave: false
    }));
    
    app.use(express.static(dir));

    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers : [AuthResolver, UserResolver, TweetResolver, CommentResolver],
            validate: false
        }),
        context: ({req, res}) => createContext(req, res),
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground
        ]
    })

    await apolloServer.start();
    app.use(graphqlUploadExpress())
    app.use(cors({
        origin: ["http://127.0.0.1:3000"],
        credentials: true
    }));

    apolloServer.applyMiddleware({
        app,
        cors: false
    });

    app.listen(PORT, () => {
        console.log("server is up and running at " +  PORT);
    })
}

main();