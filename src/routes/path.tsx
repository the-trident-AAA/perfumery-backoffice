interface Path {
  root: string;
  isProtected: boolean;
}

interface ApplicationPath {
  home: Path;
  sign_in: Path;
  perfumes: Path;
  brands: Path;
  scents: Path;
  perfumeTypes: Path;
  offers: Path;
  homeBanners: Path;
  users: Path;
}

/*function buildQueryString(query: Record<string, string> = {}): string {
  const params = new URLSearchParams(query);
  return params.toString();
}*/

export const paths: ApplicationPath = {
  home: {
    root: "/",
    isProtected: false,
  },
  sign_in: {
    root: "/sign-in",
    isProtected: false,
  },
  perfumes: {
    root: "/dashboard/perfumes",
    isProtected: true,
  },
  brands: {
    root: "/dashboard/brands",
    isProtected: true,
  },
  scents: {
    root: "/dashboard/scents",
    isProtected: true,
  },
  perfumeTypes: {
    root: "/dashboard/perfumeTypes",
    isProtected: true,
  },
  offers: {
    root: "/dashboard/offers",
    isProtected: true,
  },
  homeBanners: {
    root: "/dashboard/home-banners",
    isProtected: true,
  },
    users: {
    root: "/dashboard/users",
  },
} as const;

export const isProtectedRoute = (route: string): boolean => {
  const routeWithoutQuery = route.split("?")[0];

  for (const key in paths) {
    const path = paths[key as keyof ApplicationPath];

    if (path.root === routeWithoutQuery) {
      return path.isProtected;
    }
  }

  return false;
};
