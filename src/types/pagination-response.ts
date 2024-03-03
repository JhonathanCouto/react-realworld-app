export type PaginationMeta = {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export type PaginationLinks = {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export type PaginationResponseType<T> = {
  items: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}
