"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import useMarkedAsMain from "../../hooks/use-marked-as-main";
import { toast } from "react-toastify";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";

interface Props {
  bannerId: string;
}

export default function MarkedAsMainButton({ bannerId }: Props) {
  const { markedAsMain, loading } = useMarkedAsMain({
    onMarkedAsMainAction: () => {
      toast.success("Banner marcado como principal con éxito");
      revalidateServerTags(tagsCacheByRoutes.homeBanners.multipleTag);
    },
  });
  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        markedAsMain(bannerId);
      }}
      disabled={loading}
    >
      Marcar como principal
    </Button>
  );
}
