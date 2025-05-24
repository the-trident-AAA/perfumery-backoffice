"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { paths } from "@/routes/path";
import useSignOut from "@/sections/sign-in/form/hooks/use-sign-out";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function SignOutButtonNavUser() {
  const router = useRouter();
  const { signOut, loading } = useSignOut({
    onSignOutAction: () => {
      router.push(paths.sign_in.root);
    },
  });

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
      <LogOutIcon />
      Log out
    </DropdownMenuItem>
  );
}
