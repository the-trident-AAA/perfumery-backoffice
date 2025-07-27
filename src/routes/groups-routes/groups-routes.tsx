import { ReactNode } from "react";
import { paths } from "../path";
import { SprayCan , SoapDispenserDroplet, Type , HandCoins , House , ShoppingCart , GalleryHorizontal , Users , Layers} from "lucide-react";

export interface GroupRoute {
  title: string;
  navigationRoutes: NavigationRoute[];
}

export interface NavigationRoute {
  title: string;
  path: string;
  icon?: ReactNode;
  isActive?: boolean;
  children?: NavigationRoute[];
}

export const groupRoutes: GroupRoute[] = [
  {
    title: "Tienda",
    navigationRoutes: [
      {
        title: "Perfumes",
        icon: <SprayCan />,
        path: paths.perfumes.root,
      },
      {
        title: "Marcas",
        icon: <Layers />,
        path: paths.brands.root,
      },
      {
        title: "Aromas",
        icon: <SoapDispenserDroplet />,
        path: paths.scents.root,
      },
      {
        title: "Tipos de Perfumes",
        icon: <Type />,
        path: paths.perfumeTypes.root,
      },
      {
        title: "Ofertas",
        icon: <HandCoins />,
        path: paths.offers.root,
      },
    ],
  },
  {
    title: "Pedidos",
    navigationRoutes: [
      {
        title: "Pedidos de Perfumes",
        icon: <ShoppingCart />,
        path: paths.orders.root,
      },
    ],
  },
  {
    title: "Páginas",
    navigationRoutes: [
      {
        title: "Home",
        icon: <House />,
        path: "",
        children: [
          {
            title: "Banners",
            icon: <GalleryHorizontal />,
            path: paths.homeBanners.root,
          },
        ],
      },
    ],
  },
  {
    title: "Sistema",
    navigationRoutes: [
      {
        title: "Usuarios",
        icon: <Users />,
        path: paths.users.root,
      },
    ],
  },
];
