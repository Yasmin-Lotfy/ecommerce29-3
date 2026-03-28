import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Name Required")
    .min(6, "min is 6 Chars").max(20, "max is 20 Chars"),

    email : z.string()
    .nonempty("Email Is Required")
    .email("Email Is not Valid"),

    password : z.string()
     .nonempty("Password Is Required")
    .min(7 , "min is 7 chars"),

    rePassword  :  z.string()
     .nonempty("Re-Password Is Required")
    .min(7 , "min is 7 chars"),

    phone : z.string()
    .nonempty("Phone is Required")
    .regex(/^01[0125][0-9]{8}$/)
}).refine((data)=> data.password === data.rePassword , {
    path:["rePassword"],
    error : "Passwords Not Match"
})


export type  registerTypeSchema = z.infer<typeof registerSchema>


export const loginSchema = z.object({


    email : z.string()
    .nonempty("Email Is Required")
    .email("Email Is not Valid"),

    password : z.string()
     .nonempty("Password Is Required")
    .min(7 , "min is 7 chars"),



})


export type  loginTypeSchema = z.infer<typeof loginSchema>

