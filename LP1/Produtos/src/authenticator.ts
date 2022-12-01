import * as jwt from "jsonwebtoken"

export class Authenticator {
   generateToken = (
      payload: AuthenticationData
   ): string => {
      return jwt.sign(
         payload,
         process.env.JWT_KEY as string,
         {
            
         }
      )
   }

   getTokenData = (
      token: string
   ): AuthenticationData => {
      try{
      var decoded = jwt.verify(
         token,
         process.env.JWT_KEY as string
      )
      return decoded as AuthenticationData
   }catch (error:any){
      return {id:""} as AuthenticationData
   }
   }
}

export interface AuthenticationData {
  id: string;
}
