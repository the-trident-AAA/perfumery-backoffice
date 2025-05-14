"use client";
import type { Perfume } from "@/types/perfumes";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import PerfumeCard from "../perfume-card/perfume-card";
import EmptyContent from "@/components/empty-content/empty-content";
import useSelectablePerfumes from "./hooks/use-selectable-perfumes";

interface Props {
  perfumes: Perfume[];
  action: (perfumes: Perfume[]) => void;
}

export default function SelectablePerfumes({ perfumes, action }: Props) {
  const { selectedPerfumes, toggleSelection, handleAction } =
    useSelectablePerfumes({ action });
  return (
    <div className="flex flex-col flex-1 h-full gap-4 p-2">
      <h3 className="font-medium text-lg mb-3">
        Seleccione los perfumes que desea
      </h3>
     <div className="flex flex-col flex-1 gap-4 justify-between h-full">
       {perfumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 max-h-[55vh] overflow-auto">
          {perfumes.map((perfume) => (
            <div
              key={perfume.id}
              className="relative cursor-pointer group"
              onClick={() => toggleSelection(perfume)}
            >
              <div
                className={`
              absolute inset-0 z-10 transition-all duration-200
              ${
                selectedPerfumes.includes(perfume)
                  ? "bg-black/10 border-2 border-primary rounded-lg"
                  : "bg-transparent hover:bg-black/5 rounded-lg"
              }
            `}
              >
                {selectedPerfumes.find(
                  (selectablePerfume) => selectablePerfume.id === perfume.id
                ) && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              <PerfumeCard data={perfume} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyContent
          title="No hay perfumes disponibles para seleccionar"
          description="No fue encontrada la información de ningún perfume o ya ha seleccionado todos los perfumes disponibles"
        />
      )}

      {selectedPerfumes.length > 0 && (
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={handleAction}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Seleccionar {selectedPerfumes.length} perfume
            {selectedPerfumes.length !== 1 ? "s" : ""}
          </Button>
        </div>
      )}
     </div>
    </div>
  );
}
