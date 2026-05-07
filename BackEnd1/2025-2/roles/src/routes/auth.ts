import { Router } from "express";
import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { findUserByEmail } from "../models/userStore";


const router = Router();
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";


router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Informe email e senha" });


    const user = findUserByEmail(email);
    if (!user || !compareSync(password, user.passwordHash)) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }


    const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, {
        expiresIn: "2h",
    });


    res.json({ token });
});


export default router;