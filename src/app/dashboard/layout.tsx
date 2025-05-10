import React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashBoardLayoutHeader from "@/sections/dashboard-layout/components/header/dashboard-layout-header";
import { DashBoardLayoutAppSidebar } from "@/sections/dashboard-layout/components/app-sidebar/dashboard-layout-app-sidebar";
import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import EditProfileModalContainer from "@/sections/profile/edit/edit-profile-modal-container";

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
        <div className="container mx-auto p-2">
          {children}
          <Modal
            formPath={modalTypes.editProfileModal.name}
            maxWidth="max-w-3xl"
          >
            <EditProfileModalContainer />
          </Modal>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
