import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  withText?: boolean;
}

export default function AppLogo({ withText = true }: Props) {
  return (
    <div className="flex flex-col items-center space-x-2">
      <Avatar className="h-12 w-12">
        <AvatarImage src="/icons/logo-icon.png" />
        <AvatarFallback className="bg-secondary text-primary font-semibold text-sm">
          {"PP"}
        </AvatarFallback>
      </Avatar>
      {withText && (
        <span className="text-xl hidden sm:flex font-bold text-secondary">
          Perfumes del Puro
        </span>
      )}
    </div>
  );
}
