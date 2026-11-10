export interface PageRequest {
  page: number;
  limit: number;
}

export interface PageResponse<T> {
  items: T[];
  page: number;
  limit: number;
  hasMore: boolean;
}
