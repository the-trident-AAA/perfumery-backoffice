"use client";
import { Minus, Plus } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useCallback } from "react";
import { toast } from "react-toastify";

interface Props {
  name: string;
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  loadingAction?: boolean;
  fullWidth?: boolean;
  conditionalChange?: boolean;
  conditionalChangeError?: string;
}

export function RHFQuantityInput({
  name,
  label,
  description,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  loadingAction = false,
  fullWidth = true,
  conditionalChange = true,
  conditionalChangeError = "No es posible realizar más la acción de incremento",
}: Props) {
  const { control, setValue, watch } = useFormContext();
  const value = watch(name) ?? min;

  const actionIncrease = useCallback(() => {
    if (conditionalChange) {
      if (value + step <= max) {
        setValue(name, value + step);
      }
    } else toast.error(conditionalChangeError);
  }, [
    value,
    step,
    max,
    name,
    setValue,
    conditionalChange,
    conditionalChangeError,
  ]);

  const actionDecrease = useCallback(() => {
    if (value - step >= min) {
      setValue(name, value - step);
    }
  }, [value, step, min, name, setValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({}) => (
        <FormItem className={`${fullWidth ? "w-full" : ""}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex items-center z-10 border rounded-lg hover:border-primary/50 transition-all duration-300 w-fit">
              <button
                type="button"
                className="p-1 2xs:p-2 text-primary bg-secondary hover:bg-secondary/70 transition-all duration-200 rounded-l-md disabled:opacity-50"
                aria-label="Decrease quantity"
                onClick={actionDecrease}
                disabled={disabled || loadingAction || value <= min}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-2 2xs:px-4 font-semibold bg-muted text-secondary border-x border-secondary/20 select-none">
                {value}
              </span>
              <button
                type="button"
                className="p-1 2xs:p-2 text-primary bg-secondary hover:bg-secondary/70 transition-all duration-200 rounded-r-md disabled:opacity-50"
                aria-label="Increase quantity"
                onClick={actionIncrease}
                disabled={disabled || loadingAction || value >= max}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
