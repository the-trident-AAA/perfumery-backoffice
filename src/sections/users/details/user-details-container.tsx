import { Separator } from "@/components/ui/separator";
import { UserDetails } from "@/types/users";
import UserDetailsProfile from "./user-details-profile/user-details-profile";
import UserDetailsShopCart from "./user-details-shop-cart/user-details-shop-cart";

interface Props {
  user: UserDetails;
}

export default function UserDetailsContainer({ user }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* User Profile Section */}
      <UserDetailsProfile user={user} />

      <Separator />

      {/* Shopping Cart Section */}
      <UserDetailsShopCart shopCart={user.shopCart} />
    </div>
  );
}
