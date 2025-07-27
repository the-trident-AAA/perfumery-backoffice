import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Users } from "lucide-react";
import { User } from "@/types/users";
import UserList from "./list/users-list";


interface Props {
  users: User[];
}

export default function UsersContainer({ users }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Users />}
        sectionTitle="Gestión de Usuarios"
        sectionDescription="Gestione toda la información referente a los usuarios"
      />
      <UserList users={users} />
    </div>
  );
}
