import * as jwt from 'jsonwebtoken'
import { userRole } from '../types/user'

export async function generateToken(payload: payload) {
    return jwt.sign(
        {
            id: payload.id,
            role: payload.role
        },
        "sEnhaSuperForte123!",
        { expiresIn: "90m" }
    )
}

export function verifyToken(token: string): payload {
    const tokenData: payload = jwt.verify(
        token,
        "sEnhaSuperForte123!"
    ) as payload;
    return tokenData;
}


export type payload = {
    id: string,
    role: userRole
}