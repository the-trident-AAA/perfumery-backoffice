"use client";

import { useSession } from "next-auth/react";
import NavUser from "./nav-user";

export function NavUserContainer() {
  const { data: session } = useSession();
  const user = session?.user;
  return user ? <NavUser user={user} /> : "No hay información disponible";
}
