import { ShopCart } from "./shop-carts";

export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  role: string;
}

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

