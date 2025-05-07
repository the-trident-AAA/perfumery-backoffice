import OffersContainer from "@/sections/offers/offers-container";
import { getOffersList } from "@/services/offers";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function OffersPage({ searchParams }: Props) {
  const res = await getOffersList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching offers");

  return (
    <>
      <OffersContainer offers={res.response} />
    </>
  );
}
