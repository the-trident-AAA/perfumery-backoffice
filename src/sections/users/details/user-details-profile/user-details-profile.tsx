import { getRoleColor, UserDetails } from "@/types/users";
import { Badge, MailIcon, User as UserIcon } from "lucide-react";
import React from "react";

interface Props {
  user: UserDetails;
}

export default function UserDetailsProfile({ user }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-6">
      {/* Avatar */}
      <div className="w-full md:w-32 flex-shrink-0">
        {user.avatar ? (
          <div className="relative aspect-square rounded-full overflow-hidden border border-gray-200 mx-auto md:mx-0 w-32 h-32">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.username}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="relative aspect-square rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto md:mx-0 w-32 h-32">
            <UserIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            {user.username}
          </h2>
          <Badge color={getRoleColor(user.role)} className="w-fit">
            {user.role}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mb-4">ID: {user.id}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MailIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
