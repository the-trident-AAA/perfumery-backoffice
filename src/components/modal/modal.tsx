"use client";
import { ReactNode, useContext } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ModalContext } from "./context/modalContext";

interface Props {
  formPath: string;
  title?: string;
  titleCenter?: boolean;
  titleSize?: "small" | "medium" | "big";
  children: ReactNode;
  wide?: "small" | "normal" | "large";
  maxWidth?: string;
  className?: string;
}

export default function Modal({
  formPath,
  title,
  titleSize = "medium",
  titleCenter = false,
  children,
  wide = "normal",
  maxWidth,
  className,
}: Props) {
  const { onOpenChange, isModalOpen } = useContext(ModalContext);
  return (
    <Dialog
      open={isModalOpen(formPath)}
      onOpenChange={(_state: boolean) => onOpenChange(formPath)}
    >
      <DialogContent
        className={`w-full max-h-screen pl-2 pr-2 xs:p-4 flex flex-col  ${
          !maxWidth
            ? wide === "normal"
              ? "sm:max-w-lg"
              : wide === "large"
              ? "max-w-[1400px]"
              : "max-w-md"
            : maxWidth
        } ${className && className}`}
      >
        <DialogHeader>
          <DialogTitle
            className={`flex ${
              titleCenter ? "justify-center" : "justify-start"
            } ${
              titleSize === "medium"
                ? "text-md"
                : titleSize === "big"
                ? "text-2xl"
                : "text-sm"
            }`}
          >
            {title || ""}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto flex flex-col h-full">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
