import { SearchParamsPagination } from "@/types/pagination";
import { IQueryable } from "@/types/request";

export class QueryParamsURLFactory {
  private query: IQueryable;

  private baseUrl?: string;

  constructor(query: IQueryable, baseUrl?: string) {
    this.query = query;
    this.baseUrl = baseUrl;
  }

  build(): string {
    const queryParams = new URLSearchParams();

    // add default pagination
    if (!this.query.page) {
      queryParams.append("page", "1");
    }
    if (!this.query.limit) {
      queryParams.append("limit", "10");
    }

    Object.keys(this.query).forEach((key) => {
      if (Array.isArray(this.query[key])) {
        this.query[key].forEach((value: string) => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.append(key, this.query[key]);
      }
    });

    // Generate complete URL if baseUrl is provided
    if (this.baseUrl) {
      const url = new URL(this.baseUrl);
      url.search = queryParams.toString();
      return url.toString();
    }

    return queryParams.toString();
  }
}

export const buildQueryParams = (
  params?: SearchParamsPagination
): IQueryable => {
  const { page, perPage, search, sort } = params || {
    page: 1,
    perPage: 10,
    search: undefined,
  };

  const sortList = [];
  if (typeof sort === "object") {
    sort.forEach((s) => {
      const [field, order] = s.split(",");
      sortList.push({ field, isAsc: order === "asc" });
    });
  }
  if (typeof sort === "string") {
    const [field, order] = sort.split(",");
    sortList.push({ field, isAsc: order === "asc" });
  }
  const query: IQueryable = {
    pagination: {
      page: page ? Number(page) : 1,
      perPage: perPage ? +perPage : 10,
    },
    search,
    sorts: sortList,
  };

  return query;
};
