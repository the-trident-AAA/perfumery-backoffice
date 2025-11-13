import { TapesFilters } from "@/sections/tapes/filters/hooks/use-tapes-filters";
import { TapeEdit } from "@/sections/tapes/form/edit/schemas/tape-edit-schema";
import { TapeCreate } from "@/sections/tapes/form/new/schemas/tape-create-schema";

export interface Tape {
  id: string;
  title: string;
  image: string;
  isMain: boolean;
}

export interface TapeDetails {
  id: string;
  title: string;
  isMain: boolean;
  images: string[];
}

export interface TapeCreateDTO {
  title: string;
}

export interface TapeEditDTO {
  title: string;
}

export interface TapeFiltersDTO {
  title?: string;
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
