"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { NavigationRoute } from "@/routes/groups-routes/groups-routes";
import Link from "next/link";

interface Props {
  item: NavigationRoute;
}

export default function SidebarMenuCollapsible({ item }: Props) {
  const [isOpen, setIsOpen] = React.useState(item.isActive);
  return (
    <Collapsible asChild open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && item.icon}
            <span>{item.title}</span>
            <ChevronRight
              className={`ml-auto transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((subItem, index) =>
              subItem.children ? (
                <SidebarMenuCollapsible key={index} item={subItem} />
              ) : (
                <SidebarMenuSubItem key={index}>
                  <SidebarMenuSubButton asChild>
                    <Link className="flex gap-2 w-full" href={subItem.path}>
                      {subItem.icon && subItem.icon}
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
