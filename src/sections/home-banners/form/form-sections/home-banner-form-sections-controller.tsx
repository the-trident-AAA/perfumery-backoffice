"use client";
import { TabsPanelContext } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import { ReactNode, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  children: ReactNode;
}

export default function HomeBannerFormSectionsController({ children }: Props) {
  const { formState } = useFormContext();
  const { errors } = formState;
  const { setTabValue } = useContext(TabsPanelContext);

  useEffect(() => {
    if (errors.title || errors.description) {
      setTabValue("1"); // move to basic information section
    } else if (errors.perfumes) {
      setTabValue("2"); // move to perfumes section
    }
  }, [errors, setTabValue]);

  return children;
}
