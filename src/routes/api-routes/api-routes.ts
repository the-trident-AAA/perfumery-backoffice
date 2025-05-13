export const apiRoutes = {
  perfumes: {
    get: `${process.env.NEXT_PUBLIC_API_URL}perfume`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}perfume/:id`,
  },
  brands: {
    get: `${process.env.NEXT_PUBLIC_API_URL}brand`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}brand/:id`,
  },
  scents: {
    get: `${process.env.NEXT_PUBLIC_API_URL}scent`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}scent/:id`,
  },
  perfumeTypes: {
    get: `${process.env.NEXT_PUBLIC_API_URL}perfume-type`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}perfume-type/:id`,
  },
  offers: {
    get: `${process.env.NEXT_PUBLIC_API_URL}offer`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}offer/:id`,
  },
  homeBanners: {
    get: `${process.env.NEXT_PUBLIC_API_URL}home-banner`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}home-banner/:id`,
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
  scents: {
    singleTag: "scent",
    multipleTag: "scents",
  },
  perfumeTypes: {
    singleTag: "perfume-type",
    multipleTag: "perfume-types",
  },
  offers: {
    singleTag: "offer",
    multipleTag: "offers",
  },
  homeBanners: {
    singleTag: "home-banner",
    multipleTag: "home-banners",
  },
} as const;
