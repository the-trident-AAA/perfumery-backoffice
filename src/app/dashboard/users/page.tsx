import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import UserDetailsModalContainer from "@/sections/users/details/user-details-modal-container";
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
      <Modal
        formPath={modalTypes.detailsUserModal.name}
        title={modalTypes.detailsUserModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[65vh]"
      >
        <UserDetailsModalContainer />
      </Modal>
    </>
  );
}
