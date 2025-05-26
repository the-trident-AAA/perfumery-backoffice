import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserDetails } from "@/types/users";

import { User, Mail, ShoppingCart, ImageIcon } from "lucide-react";

interface Props {
  user: UserDetails;
}

export default function UserDetailsContainer({ user }: Props) {
  // Calculate total items and total price in cart
  const totalItems = user.shopCart.shopCartPerfumes.reduce(
    (sum, item) => sum + item.cant,
    0
  );
  const totalPrice = user.shopCart.shopCartPerfumes.reduce(
    (sum, item) => sum + item.perfume.price * item.cant,
    0
  );

  const formattedTotalPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrice);

  // Get role badge variant
  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive";
      case "moderator":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* User Profile Section */}
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
              <User className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.username}
            </h2>
            <Badge variant={getRoleBadgeVariant(user.role)} className="w-fit">
              {user.role}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mb-4">ID: {user.id}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Shopping Cart Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium">Carrito de compras</h3>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">{totalItems} artículos</Badge>
            <Badge variant="secondary">{formattedTotalPrice}</Badge>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-500">ID del Carrito</p>
              <p className="font-medium">{user.shopCart.id}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Total de Artículos</p>
              <p className="font-medium">{totalItems}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Total a Pagar</p>
              <p className="font-medium">{formattedTotalPrice}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Productos Únicos</p>
              <p className="font-medium">
                {user.shopCart.shopCartPerfumes.length}
              </p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        {user.shopCart.shopCartPerfumes.length > 0 ? (
          <div className="space-y-3">
            {user.shopCart.shopCartPerfumes.map((cartItem) => {
              const itemTotal = cartItem.perfume.price * cartItem.cant;
              const formattedItemTotal = new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(itemTotal);

              return (
                <div
                  key={cartItem.id}
                  className="border border-gray-200 rounded-md p-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Perfume image */}
                    <div className="w-16 h-16 flex-shrink-0">
                      {cartItem.perfume.image ? (
                        <img
                          src={cartItem.perfume.image || "/placeholder.svg"}
                          alt={cartItem.perfume.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Perfume details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900 truncate">
                          {cartItem.perfume.name}
                        </h4>
                        <Badge
                          color={
                            cartItem.perfume.available
                              ? "success"
                              : "destructive"
                          }
                          className="text-xs ml-2"
                        >
                          {cartItem.perfume.available
                            ? "Disponible"
                            : "Agotado"}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-500 mb-2">
                        {cartItem.perfume.brand.name}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">
                            Precio unitario:
                          </span>
                          <p className="font-medium">
                            {new Intl.NumberFormat("es-ES", {
                              style: "currency",
                              currency: "EUR",
                            }).format(cartItem.perfume.price)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Cantidad:</span>
                          <p className="font-medium">{cartItem.cant}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Subtotal:</span>
                          <p className="font-medium">{formattedItemTotal}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Contenido:</span>
                          <p className="font-medium">
                            {cartItem.perfume.milliliters} ml
                          </p>
                        </div>
                      </div>

                      {cartItem.perfume.offer && (
                        <div className="mt-2">
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-800 border-amber-200 text-xs"
                          >
                            {cartItem.perfume.offer.discount}%{" "}
                            {cartItem.perfume.offer.offerType}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">El carrito está vacío</p>
          </div>
        )}
      </div>
    </div>
  );
}
