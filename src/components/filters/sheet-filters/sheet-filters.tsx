import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ListFilterIcon } from "lucide-react";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SheetFilters({ title, children }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex gap-2">
          <p>Filtros</p>
          <ListFilterIcon />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="p-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
