"use client";
import { getUserById } from "@/services/users";
import { UserDetails } from "@/types/users";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useUser({ id }: Props) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchUser = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getUserById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información del usuario");

        setUser(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return { user, error, loading, fetchUser };
}
