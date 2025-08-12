import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  withText?: boolean;
  avatarClassName?: string
}

export default function AppLogo({ withText = true, avatarClassName = "" }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className={avatarClassName}>
        <AvatarImage src="/icons/logo-icon.png" />
        <AvatarFallback className="bg-secondary text-primary font-semibold text-sm">
          {"PP"}
        </AvatarFallback>
      </Avatar>
      {withText && (
        <span className="text-xl hidden sm:flex font-bold text-secondary">
          Gestión del Puro
        </span>
      )}
    </div>
  );
}
