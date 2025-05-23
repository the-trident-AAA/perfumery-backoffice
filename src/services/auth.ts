"use server";

import { buildApiResponse } from "@/lib/api";
import { apiRoutes } from "@/routes/api-routes/api-routes";
import { CredentialsDTO } from "@/types/auth";
import { User } from "next-auth";

export async function login(credentials: CredentialsDTO) {
  const res = await fetch(apiRoutes.auth.login, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return buildApiResponse<User>(res);
}
