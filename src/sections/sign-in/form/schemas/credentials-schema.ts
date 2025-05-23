import { z } from "zod";

export interface Credentials {
  firstCredential: string;
  password: string;
}

export const credentialsSchema = z.object({
  firstCredential: z.string().email({ message: "El email no es válido" }),
  password: z.string().min(1, { message: "Debe introducir una constraseña" }),
});
