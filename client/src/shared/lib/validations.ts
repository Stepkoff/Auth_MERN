import z from "zod";


export const signupValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must be maximum 30 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must be maximum 30 characters." }),
  email: z.string().email('Should be a valid email.'),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(40, { message: "Password must be maximum 40 characters." })
});


export const signinValidation = z.object({
  email: z.string().email('Should be a valid email.'),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(40, { message: "Password must be maximum 40 characters." })
});