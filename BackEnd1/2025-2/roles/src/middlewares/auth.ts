import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../models/userStore";


const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Token ausente" });


    const token = authHeader.split(" ")[1];


    try {
        const payload = jwt.verify(token, JWT_SECRET) as { sub: string; role: string; email: string };
        const user = findUserById(payload.sub);
        if (!user) return res.status(401).json({ message: "Usuário não encontrado" });


        (req as any).user = user; // sem augmentations globais
        next();
    } catch {
        return res.status(401).json({ message: "Token inválido" });
    }
};