interface Path {
  root: string;
}

interface ApplicationPath {
  home: Path;
  perfumes: Path;
  brands: Path;
}

/*function buildQueryString(query: Record<string, string> = {}): string {
  const params = new URLSearchParams(query);
  return params.toString();
}*/

export const paths: ApplicationPath = {
  home: {
    root: "/",
  },
  perfumes: {
    root: "/dashboard/perfumes",
  },
  brands: {
    root: "/dashboard/brands",
  },
} as const;
