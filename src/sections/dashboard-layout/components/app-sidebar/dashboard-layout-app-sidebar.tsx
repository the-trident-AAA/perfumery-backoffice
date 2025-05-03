import * as React from "react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { groupRoutes } from "@/routes/groups-routes/groups-routes";
import SidebarGroupNavigation from "@/sections/dashboard-layout/components/app-sidebar/sidebar-group-navigation/sidebar-group-navigation";

export function DashBoardLayoutAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>Logo</SidebarHeader>
      <SidebarContent>
        {groupRoutes.map((groupRoute, index) => (
          <SidebarGroupNavigation key={index} group={groupRoute} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
