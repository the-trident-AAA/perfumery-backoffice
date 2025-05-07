import BrandsContainer from "@/sections/brands/brands-container";
import { getBrandsList } from "@/services/brands";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function BrandsPage({ searchParams }: Props) {
  const res = await getBrandsList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching brands");

  return (
    <>
      <BrandsContainer brands={res.response} />
    </>
  );
}
