import { RHFMultiSelectField } from "@/components/form/rhf-components/rhf-multi-select-field/rhf-multi-select-field";
import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { Card, CardContent } from "@/components/ui/card";
import useBrands from "@/sections/brands/hooks/use-brands";
import useOffers from "@/sections/offers/hooks/use-offers";
import usePerfumeTypes from "@/sections/perfume-types/hooks/use-perfume-types";
import useScents from "@/sections/scents/hooks/use-scents";
import { Gender, genderMap } from "@/types/perfumes";
import React from "react";

export default function HomeBannerFiltersSection() {
  const {
    perfumeTypes,
    loadingData: loadingDataPerfumeTypes,
    filters: filtersPerfumeTypes,
    handleChangeFilters: handleChangeFiltersPerfumeTypes,
  } = usePerfumeTypes();
  const {
    scents,
    loadingData: loadingDataScents,
    filters: filtersScents,
    handleChangeFilters: handleChangeFiltersScents,
  } = useScents();
  const {
    brands,
    loadingData: loadingDataBrands,
    filters: filtersBrands,
    handleChangeFilters: handleChangeFiltersBrands,
  } = useBrands();
  const {
    offers,
    loadingData: loadingDataOffers,
    filters: filtersOffers,
    handleChangeFilters: handleChangeFiltersOffers,
  } = useOffers();
  return (
    <Card className="shadow-sm bg-muted">
      <CardContent className="pt-4 px-4 grid grid-cols-3 gap-3">
        <RHFSelectField
          name="perfumeTypeFilter.value"
          label="Tipo de Perfume"
          placeholder="Seleccione un tipo"
          filterValue={filtersPerfumeTypes.name}
          onFilterChange={(value) => {
            handleChangeFiltersPerfumeTypes({ name: value || undefined });
          }}
          options={perfumeTypes.map((perfumeTypes) => ({
            value: perfumeTypes.id,
            label: perfumeTypes.name,
          }))}
          loading={loadingDataPerfumeTypes}
        />
        <RHFSelectField
          name="brandFilter.value"
          label="Marca"
          placeholder="Seleccione una marca"
          filterValue={filtersBrands.name}
          onFilterChange={(value) => {
            handleChangeFiltersBrands({ name: value || undefined });
          }}
          options={brands.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))}
          loading={loadingDataBrands}
        />
        <RHFSelectField
          name="offerFilter.value"
          label="Oferta"
          placeholder="Seleccione una oferta"
          filterValue={filtersOffers.name}
          onFilterChange={(value) => {
            handleChangeFiltersOffers({ name: value || undefined });
          }}
          options={offers.map((offer) => ({
            value: offer.id,
            label: offer.name,
          }))}
          loading={loadingDataOffers}
        />
        <RHFSelectField
          name="genderFilter.value"
          label="Género"
          placeholder="Seleccione un género"
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
        />

        <RHFNumberField
          name="priceMinFilter.value"
          label="Precio Mínimo"
          placeholder="0.1"
          description="Precio en USD"
          fullWidth={false}
        />
        <RHFNumberField
          name="priceMaxFilter.value"
          label="Precio Máximo"
          placeholder="0.1"
          description="Precio en USD"
          fullWidth={false}
        />

        <RHFNumberField
          name="totalPriceMinFilter.value"
          label="Precio Total Mínimo"
          placeholder="0.1"
          description="Precio Total en USD"
          fullWidth={false}
        />
        <RHFNumberField
          name="totalPriceMaxFilter.value"
          label="Precio Total Máximo"
          placeholder="0.1"
          description="Precio Total en USD"
          fullWidth={false}
        />

        <RHFNumberField
          name="millilitersMinFilter.value"
          label="Mililitros Mínimo"
          placeholder="0.1"
          description="Volumen en Mililitros"
          fullWidth={false}
        />
        <RHFNumberField
          name="millilitersMaxFilter.value"
          label="Mililitros Máximo"
          placeholder="0.1"
          description="Volumen en Mililitros"
          fullWidth={false}
        />

        <RHFTextField
          name="nameFilter.value"
          label="Nombre"
          placeholder="Ingrese el nombre"
        />

        <RHFMultiSelectField
          name="scentsIdsFilter.value"
          label="Aromas"
          description="Seleccione todos los aromas que apliquen"
          emptyText="No hay aromas disponibles"
          options={scents.map((scent) => ({
            value: scent.id,
            label: scent.name,
          }))}
          columns={3}
          loading={loadingDataScents}
          searchInput={{
            placeHolderText: "Buscar esencia...",
            value: filtersScents.name,
            onChange: (e) => {
              handleChangeFiltersScents({
                name: e.target.value || undefined,
              });
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
