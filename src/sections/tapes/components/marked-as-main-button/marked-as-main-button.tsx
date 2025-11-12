"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import useMarkedAsMain from "../../hooks/use-marked-as-main";
import { toast } from "react-toastify";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";

interface Props {
  tapeId: string;
}

export default function MarkedAsMainButton({ tapeId }: Props) {
  const { markedAsMain, loading } = useMarkedAsMain({
    onMarkedAsMainAction: () => {
      toast.success("Cinta marcada como principal con éxito");
      revalidateServerTags(tagsCacheByRoutes.tapes.multipleTag);
    },
  });
  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        markedAsMain(tapeId);
      }}
      disabled={loading}
      className="h-7 text-sm px-2"
    >
      Marcar como principal
    </Button>
  );
}
