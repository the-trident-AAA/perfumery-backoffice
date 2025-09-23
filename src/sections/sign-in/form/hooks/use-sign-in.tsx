"use client";
import { useCallback, useState } from "react";
import { Credentials } from "../schemas/credentials-schema";
import { signIn as nextAuthSignIn } from "next-auth/react";

export default function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (credentials: Credentials) => {
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    loading,
    error,
    signIn,
  };
}
