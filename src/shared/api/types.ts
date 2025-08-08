// src/shared/api/types.ts
export type ApiResponse<T> = {
  data: T;
  // optionally: status?: string; message?: string; meta?: any;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
