import NextAuth from "next-auth";

import { JWT } from "next-auth/jwt"


declare module "next-auth" {
  interface User {
    id: string;
    user: UserDataI;
    token: decodedTokenI;
  }

  interface UserDataI {
    name: string;
    email: string;
    role: string;
  }
  interface decodedTokenI{
    id:string;
    
  }

}



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
   user : UserDataI;
    idToken?: string
    id:string
  }
}