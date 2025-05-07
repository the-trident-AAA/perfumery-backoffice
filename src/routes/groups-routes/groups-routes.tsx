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
      }
    ],
  },
];
