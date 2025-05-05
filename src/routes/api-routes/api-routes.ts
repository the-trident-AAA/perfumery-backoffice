export const apiRoutes = {
  perfumes: {
    get: `${process.env.NEXT_PUBLIC_API_URL}perfumes`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}perfumes/:id`,
  },
} as const;

export const tagsCacheByRoutes = {
  perfumes: {
    singleTag: "perfume",
    multipleTag: "perfumes"
  },
} as const;
