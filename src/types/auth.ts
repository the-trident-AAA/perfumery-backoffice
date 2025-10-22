import { Credentials } from "@/sections/sign-in/form/schemas/credentials-schema";
import { UserRole } from "./users";

export interface CredentialsDTO {
  username: string;
  password: string;
}

export interface TokenPayLoad {
  accessToken: string;
  id: string;
  username: string;
  email: string;
  shopCartId: string;
  role: UserRole;
}

export const convertCredentialsDTO = (
  credentials: Credentials
): CredentialsDTO => {
  return {
    ...credentials,
    username: credentials.firstCredential,
  };
};
