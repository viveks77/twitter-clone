import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {Session} from 'express-session';

declare module 'express-session'{
    interface Session {
        userId: number;
    }
}

export interface Context{
    req: Request & {session : Session};
    res: Response;
    prisma: PrismaClient
}