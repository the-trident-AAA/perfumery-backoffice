import HomeBannersContainer from "@/sections/home-banners/home-banners-container";
import { getHomeBannersList } from "@/services/home-banners";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function HomeBannersPage({ searchParams }: Props) {
  const res = await getHomeBannersList(await searchParams);

  if (!res.response || res.error)
    throw new Error("Error fetching home banners");
  return (
    <>
      <HomeBannersContainer homeBanners={res.response} />
    </>
  );
}
