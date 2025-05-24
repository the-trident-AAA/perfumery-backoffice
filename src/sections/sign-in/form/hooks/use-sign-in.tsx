"use client";
import { useCallback, useState } from "react";
import { Credentials } from "../schemas/credentials-schema";
import { signIn as nextAuthSignIn } from "next-auth/react";

interface Props {
  onSignInAction: () => void;
}

export default function useSignIn({ onSignInAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(
    async (credentials: Credentials) => {
      try {
        setLoading(true);
        setError(null);
        const res = await nextAuthSignIn("credentials", {
          username: credentials.firstCredential,
          password: credentials.password,
          redirect: false,
        });
        if (res.error)
          setError("Las credenciales proporcionadas no son correctas");
        else onSignInAction();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onSignInAction]
  );
  return {
    loading,
    error,
    signIn,
  };
}
