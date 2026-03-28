import { decode } from "next-auth/jwt";
import { cookies } from "next/headers"




export async function getUserToken() {



  const decodedToken =   (await cookies()).get("next-auth.session-token")?.value ||  (await cookies()).get("__Secure-next-auth.session-token")?.value;

  const token = await decode({token : decodedToken, secret : process.env.AUTH_SECRET ! })


//   console.log(token?.token, "our token");
  



    return token?.token
    
}