export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface PaginationData<T> {
  meta: {
    page: number;
    perPage: number;
    total: number;
    hasNext: boolean;
  };
  data: T[];
}
