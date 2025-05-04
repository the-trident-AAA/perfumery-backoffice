"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useContext, type ReactNode } from "react";

interface Props {
  sectionTitle: string;
  sectionDescription: string;
  sectionIcon: ReactNode;
  buttonText?: string;
  creationPath: string;
  isModalRedirect?: boolean;
}

export default function SectionsHeader({
  sectionTitle,
  sectionDescription,
  sectionIcon,
  buttonText,
  creationPath,
  isModalRedirect = false,
}: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  const router = useRouter();
  const handeRedirect = useCallback(() => {
    if (isModalRedirect) handleOpenModal({ name: creationPath });
    else router.push(creationPath);
  }, [handleOpenModal, isModalRedirect, router, creationPath]);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center p-3 text-white bg-primary rounded-lg">
          {sectionIcon}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">{sectionTitle}</h1>
          <p className="text-sm text-gray-500">{sectionDescription}</p>
        </div>
      </div>
      {buttonText && <Button onClick={handeRedirect}>{buttonText}</Button>}
    </div>
  );
}
