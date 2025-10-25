"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircleIcon, Search, ChevronDown, XIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

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
  clearable?: boolean;
  // Nuevas props para el filtrado
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterPlaceholder?: string;
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
  clearable = false,
  // Nuevas props para el filtrado
  filterValue,
  onFilterChange,
  filterPlaceholder = "Buscar...",
}: Props) {
  const { control, setValue, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = watch(name);
  const selectedOption = options.find(
    (option) => option.value === currentValue
  );

  const handleClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  const handleSelect = (value: string) => {
    setValue(name, value, { shouldValidate: true });
    setIsOpen(false);
  };

  // Cerrar el dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus en el input cuando se abre el dropdown
  useEffect(() => {
    if (isOpen && onFilterChange && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, onFilterChange]);

  return (
    <FormField
      control={control}
      name={name}
      render={({}) => (
        <FormItem className={`${fullWidth ? "w-full" : ""}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative" ref={selectRef}>
              {/* Trigger personalizado */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
                className={cn(
                  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  fullWidth ? "w-full" : "",
                  !selectedOption && "text-muted-foreground"
                )}
              >
                <span>
                  {loading
                    ? "Cargando..."
                    : selectedOption
                    ? selectedOption.label
                    : placeholder || "Selecciona"}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>

              {/* Dropdown personalizado */}
              {isOpen && (
                <div className="absolute z-50 w-full mt-1 border border-input bg-background rounded-md shadow-md max-h-60 overflow-auto">
                  {/* Input de búsqueda */}
                  {onFilterChange && (
                    <div className="p-2 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          ref={inputRef}
                          placeholder={filterPlaceholder}
                          value={filterValue || ""}
                          onChange={(e) => onFilterChange(e.target.value)}
                          className="pl-10"
                          // Prevenir que el input cierre el dropdown
                          onKeyDown={(e) => {
                            if (e.key === "Escape") {
                              setIsOpen(false);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Lista de opciones */}
                  <div className="py-1">
                    {options.length > 0 ? (
                      options.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelect(option.value)}
                          className={cn(
                            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            currentValue === option.value &&
                              "bg-accent text-accent-foreground"
                          )}
                        >
                          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                            {currentValue === option.value && (
                              <span className="h-2 w-2 rounded-full bg-current" />
                            )}
                          </span>
                          {option.label}
                        </button>
                      ))
                    ) : (
                      <div className="flex gap-2 p-2 text-sm text-muted-foreground">
                        <AlertCircleIcon className="h-4 w-4" />
                        {emptyText}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {clearable && currentValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  title="Clear selection"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
