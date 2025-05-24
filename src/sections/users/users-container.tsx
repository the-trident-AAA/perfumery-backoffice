import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";
import UsersList from "./list/users-list";
import { User } from "@/types/users";


interface Props {
  users: User[];
}

export default function UsersContainer({ users }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Package />}
        sectionTitle="Gestión de Usuarios"
        sectionDescription="Gestione toda la información referente a los usuarios"
      />
      <UsersList users={users} />
    </div>
  );
}
