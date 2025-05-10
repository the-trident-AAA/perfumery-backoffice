"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import React, { useState } from "react";
import ChangePasswordButton from "./change-password-button/change-password-button";

export default function EditProfileForm() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, firstName, lastName });
  };

  return (
    <div className="w-full mx-auto overflow-hidden bg-white mt-1">
      <div className="flex flex-col items-center justify-center pt-4 bg-gradient-to-b from-green-50 to-white">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100">
          <User className="w-8 h-8 text-blue-500" />
        </div>
        <div className="text-xl font-semibold text-center text-gray-800">
          Editar Perfil
        </div>
      </div>
      <div className="p-6 ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-black pl-4 mb-1 block"
            >
              Nombre de usuario*
            </label>
            <Input
              id="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-green-200 focus:outline-none focus:ring-2 focus:ring-green-100"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-black pl-4 mb-1 block"
            >
              Nombres*
            </label>
            <Input
              id="firstName"
              placeholder="Nombres"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-green-200 focus:outline-none focus:ring-2 focus:ring-green-100"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-black pl-4 mb-1 block"
            >
              Apellidos*
            </label>
            <Input
              id="lastName"
              placeholder="Apellidos"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-green-200 focus:outline-none focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="flex justify-center mt-2">
            <ChangePasswordButton />
          </div>

          <Button className="w-full" type="submit">Editar</Button>
        </form>
      </div>
    </div>
  );
}
