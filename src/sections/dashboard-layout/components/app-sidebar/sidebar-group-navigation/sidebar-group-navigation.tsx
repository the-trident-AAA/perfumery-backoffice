import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GroupRoute } from "@/routes/groups-routes/groups-routes";
import SidebarMenuCollapsible from "../sidebar-menu-collapsible/sidebar-menu-collapsible";
import Link from "next/link";

interface Props {
  group: GroupRoute;
}

export default function SidebarGroupNavigation({ group }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
      <SidebarMenu>
        {group.navigationRoutes.map((navigationRoute, index) =>
          navigationRoute.children ? (
            <SidebarMenuCollapsible key={index} item={navigationRoute} />
          ) : (
            <SidebarMenuItem key={index}>
              <Link className="flex gap-2 w-full" href={navigationRoute.path}>
                <SidebarMenuButton tooltip={navigationRoute.title}>
                  {navigationRoute.icon && navigationRoute.icon}
                  <span>{navigationRoute.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
