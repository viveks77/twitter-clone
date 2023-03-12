import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Context } from "../models/context";

const prisma = new PrismaClient();

export function createContext(req: Request, res: Response): Context {
    return {
        req,
        res,
        prisma,
    };
}
