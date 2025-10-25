import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFToggleField } from "@/components/form/rhf-components/rhf-toggle-field/rhf-toggle-field";
import useOffers from "@/sections/offers/hooks/use-offers";
export default function PerfumeComercialInfoFormSection() {
  const {
    offers,
    loadingData: offersLoadingData,
    filters: offersFilters,
    handleChangeFilters: offersHandleChangeFilters,
  } = useOffers();

  return (
    <Card className="shadow-sm bg-muted">
      <CardContent className="pt-4 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RHFNumberField
            name="price"
            label="Precio"
            placeholder="0.00"
            description="Precio en USD"
          />
          <RHFNumberField
            name="cant"
            label="Cantidad"
            placeholder="0"
            description="Unidades disponibles"
          />
          <RHFSelectField
            name="offerId"
            label="Oferta"
            placeholder="Seleccione una oferta"
            options={offers.map((offer) => ({
              value: offer.id,
              label: offer.name,
            }))}
            filterValue={offersFilters.name}
            onFilterChange={(value) => {
              offersHandleChangeFilters({ name: value || undefined });
            }}
            loading={offersLoadingData}
            emptyText="No hay ofertas"
            clearable
          />
        </div>

        <div className="mt-3">
          <RHFToggleField
            name="available"
            label="Disponible"
            description="Marque si el producto está disponible para la venta"
          />
        </div>
      </CardContent>
    </Card>
  );
}
