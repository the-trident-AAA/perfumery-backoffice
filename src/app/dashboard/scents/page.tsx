import ScentsContainer from "@/sections/scents/scents-container";
import { getScentsList } from "@/services/scents";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function ScentsPage({ searchParams }: Props) {
  const res = await getScentsList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching scents");

  return (
    <>
      <ScentsContainer scents={res.response} />
    </>
  );
}
