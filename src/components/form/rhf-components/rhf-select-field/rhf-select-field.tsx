"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircleIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  loading?: boolean;
  emptyText?: string;
}

export function RHFSelectField({
  name,
  label,
  placeholder,
  description,
  options,
  fullWidth = true,
  loading = false,
  emptyText = "No hay datos",
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${fullWidth ? "w-full" : ""}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={loading} // Deshabilita si está cargando
            >
              <SelectTrigger className={`${fullWidth ? "w-full" : ""}`}>
                <SelectValue
                  placeholder={
                    loading ? "Cargando..." : placeholder || "Selecciona"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {options.length > 0 ? (
                  options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="flex gap-2 p-2">
                    <AlertCircleIcon />
                    {emptyText}
                  </div>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
