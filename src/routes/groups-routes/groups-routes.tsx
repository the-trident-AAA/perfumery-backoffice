import { ReactNode } from "react";
import { paths } from "../path";
import { Package } from "lucide-react";

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
        icon: <Package />,
        path: paths.perfumes.root,
      },
      {
        title: "Marcas",
        icon: <Package />,
        path: paths.brands.root,
      },
      {
        title: "Aromas",
        icon: <Package />,
        path: paths.scents.root,
      },
      {
        title: "Tipos de Perfumes",
        icon: <Package />,
        path: paths.perfumeTypes.root,
      },
      {
        title: "Ofertas",
        icon: <Package />,
        path: paths.offers.root,
      },
    ],
  },
  {
    title: "Páginas",
    navigationRoutes: [
      {
        title: "Home",
        icon: <Package />,
        path: "",
        children: [
          {
            title: "Banners",
            icon: <Package />,
            path: paths.homeBanners.root,
          },
        ],
      },
    ],
  },
  {
    title: "Perfiles",
    navigationRoutes: [
      {
        title: "Usuarios",
        icon: <Package />,
        path: paths.users.root,
      },
    ],
  },
  {
    title: "Pedidos",
    navigationRoutes: [
      {
        title: "Pendientes",
        icon: <Package />,
        path: paths.users.root,
      },
            {
        title: "Historial",
        icon: <Package />,
        path: paths.users.root,
      },
    ],
  },
];
