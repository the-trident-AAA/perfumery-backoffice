"use client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
}

export function RHFNumberField({
  name,
  label,
  placeholder,
  description,
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type="number"
              placeholder={placeholder}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
