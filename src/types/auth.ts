import { Credentials } from "@/sections/sign-in/form/schemas/credentials-schema";

export interface CredentialsDTO {
  username: string;
  password: string;
}

export const convertCredentialsDTO = (
  credentials: Credentials
): CredentialsDTO => {
  return {
    ...credentials,
    username: credentials.firstCredential,
  };
};
