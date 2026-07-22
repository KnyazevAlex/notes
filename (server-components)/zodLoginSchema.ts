import * as z from "zod"



const zodLoginSchema = z.object({
  
    email: z.email({error: 'Invalid email!'}).trim(),

    password: z
              .string()
              .min(1, {error: `Password can't be blank!`})
})

export default zodLoginSchema