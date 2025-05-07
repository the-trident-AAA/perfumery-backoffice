import PerfumeTypesContainer from "@/sections/perfume-types/perfume-types-container";
import ScentsContainer from "@/sections/scents/scents-container";
import { getPerfumeTypesList } from "@/services/perfume-types";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function PerfumeTypesPage({ searchParams }: Props) {
  const res = await getPerfumeTypesList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching perfumeTypes");

  return (
    <>
      <PerfumeTypesContainer perfumeTypes={res.response} />
    </>
  );
}
