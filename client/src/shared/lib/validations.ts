import z from "zod";

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const signUpValidation = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must be maximum 30 characters." }),
  email: z.string().email('Should be a valid email.'),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(40, { message: "Password must be maximum 40 characters." }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(40, { message: "Password must be maximum 40 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

// signUpValidation.parse({ password: "asdf", confirmPassword: "qwer" });

export const signInValidation = z.object({
  email: z.string().email('Should be a valid email.'),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(40, { message: "Password must be maximum 40 characters." })
});

export const profileValidation = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.")
    .optional(),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must be maximum 30 characters." }),
  email: z.string().email('Should be a valid email.'),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(40, { message: "Password must be maximum 40 characters." })
    .optional()
    .or(z.literal('')),
  confirmPassword: z
    .string()
    .optional()
    .or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})