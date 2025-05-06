"use client";
import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options: Option[];
}

export function RHFMultiSelectField({
  name,
  label,
  placeholder,
  description,
  options,
}: Props) {
  const { control, setValue, watch } = useFormContext();
  const [open, setOpen] = useState(false);
  const selectedValues = watch(name) || [];

  const handleSelect = (option: Option) => {
    const currentValues = [...selectedValues];
    const optionObject = { id: Number(option.value), name: option.label };

    const exists = currentValues.some((item) => item.id === optionObject.id);

    if (exists) {
      const filtered = currentValues.filter(
        (item) => item.id !== optionObject.id
      );
      setValue(name, filtered, { shouldValidate: true });
    } else {
      setValue(name, [...currentValues, optionObject], {
        shouldValidate: true,
      });
    }
  };

  const handleRemove = (id: number) => {
    const filtered = selectedValues.filter((item: any) => item.id !== id);
    setValue(name, filtered, { shouldValidate: true });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between",
                    !selectedValues.length && "text-muted-foreground"
                  )}
                >
                  {selectedValues.length > 0
                    ? `${selectedValues.length} seleccionados`
                    : placeholder || "Seleccionar..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Buscar..." />
                <CommandList>
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {options.map((option) => {
                      const isSelected = selectedValues.some(
                        (item: any) => item.id === Number(option.value)
                      );
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => handleSelect(option)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedValues.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedValues.map((item: any) => (
                <Badge key={item.id} variant="secondary" className="text-xs">
                  {item.name}
                  <button
                    type="button"
                    className="ml-1 rounded-full outline-none focus:ring-2"
                    onClick={() => handleRemove(item.id)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
