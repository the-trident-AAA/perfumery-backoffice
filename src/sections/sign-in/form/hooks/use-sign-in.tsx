"use client";
import { useCallback, useState } from "react";
import { Credentials } from "../schemas/credentials-schema";
import { signIn as signInService } from "@/services/auth";
import { convertCredentialsDTO } from "@/types/auth";

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
        await signInService(convertCredentialsDTO(credentials));
        onSignInAction();
      } catch (error) {
        console.log(error);
        setError("Las credenciales proporcionadas no son correctas");
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
