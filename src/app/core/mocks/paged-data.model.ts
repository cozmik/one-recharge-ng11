
export interface PagedDataModel {
  isLast: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  content: Array<any>;
}
