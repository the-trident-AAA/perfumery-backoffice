import { UsersFilters } from "@/sections/users/filters/hooks/use-user-filters";
import { ShopCart } from "./shop-carts";

export enum UserRole {
  ADMIN = "admin",
  USER = "client",
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  role: string;
}

export interface UserFiltersDTO {
  username?: string;
  email?: string;
  role?: string;
}

export const convertUserFiltersDTO = (
  usersFilters: UsersFilters
): UserFiltersDTO => {
  return { ...usersFilters };
};

export interface UserDetails extends User {
  shopCart: ShopCart;
}

export const getRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "destructive";
    case "moderator":
      return "secondary";
    default:
      return "outline";
  }
};
