import UsersContainer from "@/sections/users/users-container";
import { getUsersList } from "@/services/users";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function UsersPage({ searchParams }: Props) {
  const res = await getUsersList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching users");

  return (
    <>
     <UsersContainer users={res.response} />
    </>
  );
}
