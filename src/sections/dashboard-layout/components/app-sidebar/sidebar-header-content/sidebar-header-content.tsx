"use client";
import AppLogo from "@/components/app-logo/app-logo";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

export default function SidebarHeaderContent() {
  const { open } = useSidebar();
  return (
    <div className="flex text-white flex-col gap-4 items-center justify-center">
      <AppLogo
        withText={open}
        avatarClassName={open ? "h-26 w-26" : "h-10 w-10"}
      />
    </div>
  );
}
