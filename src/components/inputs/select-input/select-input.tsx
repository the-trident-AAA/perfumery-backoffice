"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Props {
  label?: string;
  placeHolder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
  loading?: boolean;
}

export default function SelectInput({
  label,
  placeHolder = "Seleccione elemento",
  value,
  onValueChange,
  options,
  loading = false,
}: Props) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select
        value={value || ""}
        onValueChange={onValueChange}
        disabled={loading}
      >
        <SelectTrigger>
          <SelectValue placeholder={loading ? "Cargando..." : placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
