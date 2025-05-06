export const apiRoutes = {
  perfumes: {
    get: `${process.env.NEXT_PUBLIC_API_URL}perfume`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}perfume/:id`,
  },
  brands: {
    get: `${process.env.NEXT_PUBLIC_API_URL}brand`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}brand/:id`,
  },
} as const;

export const tagsCacheByRoutes = {
  perfumes: {
    singleTag: "perfume",
    multipleTag: "perfumes",
  },
  brands: {
    singleTag: "brand",
    multipleTag: "brands",
  },
} as const;
