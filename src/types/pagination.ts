export type IPaginatedData<T> = {
    data: T[]
    totalCount: number
    page: number
    pageSize: number
    hasNext: true
    hasPrevious: true
}

export type Pagination = {
    page: number
    pageSize: number
    total: number
}

export type SearchParamsPagination = {
    sort?: string | string[]
    search?: string
    page?: number
    perPage?: number
    currentModal?: string
    categoryId?: string
    id?: string
    status?: string
    classification?: string
}
