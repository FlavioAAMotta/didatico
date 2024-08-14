import * as jwt from "jsonwebtoken";
import { USER_ROLES } from "../types";
export type AuthenticationData = {
  id: string;
  role: USER_ROLES
}
export class Authenticator {
  
  generateToken = (payload: AuthenticationData): string => {
    return jwt.sign(
      payload,
      process.env.JWT_KEY as string,
      { expiresIn: "59min" }
    );
  };

  getTokenData = (token: string): AuthenticationData => {
    try {
      var decoded = jwt.verify(token, process.env.JWT_KEY as string);
      return decoded as AuthenticationData;
    } catch (error: any) {
      if (error.message.includes("jwt expired")) {
        throw new Error("Token expired")
      }
      throw new Error(error.message);
    }
  };
}

