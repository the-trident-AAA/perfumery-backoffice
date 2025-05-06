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
}

export function RHFSelectField({
  name,
  label,
  placeholder,
  description,
  options,
  fullWidth = true,
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
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={`${fullWidth ? "w-full" : ""}`}>
                <SelectValue placeholder={placeholder || "Selecciona"} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
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
