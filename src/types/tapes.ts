import { TapesFilters } from "@/sections/tapes/filters/hooks/use-tapes-filters";
import { TapeEdit } from "@/sections/tapes/form/edit/schemas/tape-edit-schema";
import { TapeCreate } from "@/sections/tapes/form/new/schemas/tape-create-schema";

export interface Tape {
  id: string;
  name: string;
  image: string;
  isMain: boolean;
}

export interface TapeDetails {
  id: string;
  name: string;
  isMain: boolean;
  image: string;
}

export interface TapeCreateDTO {
  name: string;
}

export interface TapeEditDTO {
  name: string;
}

export interface TapeFiltersDTO {
  name?: string;
}

export const convertTapeCreateDTO = (
  tapeCreate: Omit<TapeCreate, "image">
): TapeCreateDTO => {
  return {
    ...tapeCreate,
  };
};

export const convertTapeEditDTO = (
  tapeEdit: Omit<TapeEdit, "image">
): TapeEditDTO => {
  return {
    ...tapeEdit,
  };
};

export const convertTapeFiltersDTO = (
  tapesFilters: TapesFilters
): TapeFiltersDTO => {
  return { ...tapesFilters };
};
