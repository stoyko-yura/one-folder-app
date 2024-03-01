export interface PaginationOptions<T> {
  limit: number;
  pageIndex: number;
  orderBy?: T;
}
