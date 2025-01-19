import {  Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";


export function middleware (req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";

    const decode = jwt.verify(token, JWT_SECRET)
    if(decode){
        // @ts-ignore: fix for below: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript 
        req.userId = decode.userId;
        next();
    } else {
        res.status(403).json({
            message: "unauthorized"
        })
    }
}