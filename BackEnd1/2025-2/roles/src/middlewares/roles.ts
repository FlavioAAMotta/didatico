import { Request, Response, NextFunction } from "express";

export const requireRole = (allowed: string | string[]) => {
    const roles = Array.isArray(allowed) ? allowed : [allowed];

    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user) return res.status(401).json({ message: "Não autenticado" });

        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        next();
    };
};