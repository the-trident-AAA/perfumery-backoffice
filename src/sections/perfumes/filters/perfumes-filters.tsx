import { useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Brand } from "@/types/brands";
import { PerfumeType } from "@/types/perfume-types";
import { Scent } from "@/types/scents";
import { Offer } from "@/types/offers";
import { Gender, genderMap } from "@/types/perfumes";
import { PerfumesFilters as PerfumesFiltersType } from "./hooks/use-perfumes-filters";
import SearchInput from "@/components/inputs/search-input/search-input";
import SelectInput from "@/components/inputs/select-input/select-input";
import CheckboxInput from "@/components/inputs/checkbox-input/checkbox-input";
import SliderInput from "@/components/inputs/slider-input/slider-input";
import ListInput from "@/components/inputs/list-input/list-input";
import { OptionData } from "@/types/filters";

interface Props {
  filters: PerfumesFiltersType;
  handleChangeFilters: (filters: Partial<PerfumesFiltersType>) => void;
  brands: OptionData<Brand>;
  perfumeTypes: OptionData<PerfumeType>;
  scents: OptionData<Scent>;
  offers: OptionData<Offer>;
}

export default function PerfumesFilters({
  filters,
  brands,
  perfumeTypes,
  scents,
  offers,
  handleChangeFilters,
}: Props) {
  const handleScentChange = useCallback(
    (scentId: string, checked: boolean) => {
      const currentScents = filters.scentsIds || [];
      const newScents = checked
        ? [...currentScents, scentId]
        : currentScents.filter((id) => id !== scentId);

      handleChangeFilters({
        scentsIds: newScents.length > 0 ? newScents : undefined,
      });
    },
    [filters, handleChangeFilters]
  );

  return (
    <div className="space-y-6">
      {/* Search for name */}
      <SearchInput
        id="name"
        label="Buscar por nombre"
        value={filters.name}
        placeHolder="Introduzca el nombre del perfume..."
        onChange={(e) => {
          handleChangeFilters({ name: e.target.value || undefined });
        }}
      />
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Brand */}
        <SelectInput
          label="Marca"
          placeHolder="Seleccione una marca..."
          value={filters.brandId}
          onValueChange={(value) => {
            handleChangeFilters({ brandId: value || undefined });
          }}
          options={brands.data.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))}
          loading={brands.loading}
          clearable={{
            handleClear: () => {
              handleChangeFilters({ brandId: undefined });
            },
          }}
        />

        {/* Gender */}
        <SelectInput
          label="Género"
          placeHolder="Seleccione un género..."
          value={filters.gender}
          onValueChange={(value) => {
            handleChangeFilters({ gender: (value as Gender) || undefined });
          }}
          options={[
            {
              value: Gender.MALE,
              label: genderMap.get(Gender.MALE)?.name as string,
            },
            {
              value: Gender.FEMALE,
              label: genderMap.get(Gender.FEMALE)?.name as string,
            },
            {
              value: Gender.UNISEX,
              label: genderMap.get(Gender.UNISEX)?.name as string,
            },
          ]}
          clearable={{
            handleClear: () => {
              handleChangeFilters({ gender: undefined });
            },
          }}
        />

        {/* PerfumeType */}
        <SelectInput
          label="Tipo de Perfume"
          placeHolder="Seleccione un tipo de perfume..."
          value={filters.perfumeTypeId}
          onValueChange={(value) => {
            handleChangeFilters({ perfumeTypeId: value || undefined });
          }}
          options={perfumeTypes.data.map((perfumeType) => ({
            value: perfumeType.id,
            label: perfumeType.name,
          }))}
          loading={perfumeTypes.loading}
          clearable={{
            handleClear: () => {
              handleChangeFilters({ perfumeTypeId: undefined });
            },
          }}
        />
      </div>
      <Separator />
      {/* Available y Offers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Disponibilidad */}
        <CheckboxInput
          id="available"
          label="Disponibilidad"
          description="Solo productos disponibles"
          value={filters.available}
          onCheckedChange={(checked) => {
            handleChangeFilters({ available: checked ? true : undefined });
          }}
        />

        {/* Offers */}
        <SelectInput
          label="Oferta"
          placeHolder="Seleccione una oferta..."
          value={filters.offerId}
          onValueChange={(value) => {
            handleChangeFilters({ offerId: value || undefined });
          }}
          options={offers.data.map((offer) => ({
            value: offer.id,
            label: offer.name,
          }))}
          loading={offers.loading}
          clearable={{
            handleClear: () => {
              handleChangeFilters({ offerId: undefined });
            },
          }}
        />
      </div>
      <Separator />
      {/* Price and Mililiters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price */}
        <SliderInput
          label="Precio"
          meansure="$"
          value={filters.priceRange}
          step={5}
          handleChangeFilters={(value) => {
            handleChangeFilters({
              priceRange: value as [number, number],
            });
          }}
        />

        {/* Mililiters */}
        <SliderInput
          label="Mililitros"
          meansure="ml"
          value={filters.millilitersRange}
          step={5}
          handleChangeFilters={(value) => {
            handleChangeFilters({
              millilitersRange: value as [number, number],
            });
          }}
        />

        {/* Sales */}
        <SliderInput
          label="Ventas"
          value={filters.salesRange}
          step={5}
          handleChangeFilters={(value) => {
            handleChangeFilters({
              salesRange: value as [number, number],
            });
          }}
        />
      </div>
      <Separator />
      {/* Scents */}
      <ListInput
        id="scents"
        label="Aromas"
        values={filters.scentsIds}
        options={scents.data.map((scent) => ({
          value: scent.id,
          label: scent.name,
        }))}
        loading={scents.loading}
        handleValuesChange={handleScentChange}
      />
    </div>
  );
}
