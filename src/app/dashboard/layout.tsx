import React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashBoardLayoutHeader from "@/sections/dashboard-layout/components/header/dashboard-layout-header";
import { DashBoardLayoutAppSidebar } from "@/sections/dashboard-layout/components/app-sidebar/dashboard-layout-app-sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashBoardLayoutAppSidebar />
      <SidebarInset>
        <DashBoardLayoutHeader />
        <div className="container mx-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
