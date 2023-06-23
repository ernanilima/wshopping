export interface Response<E> {
  content: E;
  totalPages: number;
  totalElements: number;
  size: number;
  page: number;
  numberOfElements: number;
}
