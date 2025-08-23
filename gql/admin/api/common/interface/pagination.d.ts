interface Pagination {
  currentPage: number;
  hasNextPage: boolean;
  totalItems: number;
  totalPages: number;
}

export interface PaginationArgs {
  page?: number;
  limit?: number;
}

export { Pagination, PaginationArgs };
