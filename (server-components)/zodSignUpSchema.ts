import * as z from "zod"



const zodSignUpSchema = z.object({
    name:  z
           .string()
           .trim()
           .min(2, {error: 'Name must be at least 2 characters long!'})
           ,
    email: z.email({error: 'Please enter a valid email!'}).trim(),

    password: z
              .string()
              .min(8, {error: 'Password must be at least 8 characters long!'})
              .regex(/[a-zA-Z]/, {error:'Password must contain at least one letter!'})
              .regex(/[0-9]/, {error:'Password must contain at leadt one number!'})
              .regex(/[^a-zA-Z0-9]/, {error: 'Passowrd must contain at least 1 special character!'})
})


export type FormState = {
  errors: {
    fieldErrors: {
      name?: string[];
      email?: string[];
      password?: string[];
      
      
    };
    formErrors?: string[];
  };
  message?: string;
}



export default zodSignUpSchema