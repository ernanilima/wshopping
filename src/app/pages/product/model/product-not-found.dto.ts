import { Columns } from 'src/app/shared/model/columns.model';

export interface ProductNotFoundDto {
  barcode: string;
  attempts: number;
}

export const productNotFoundColumns: Columns[] = [
  {
    name: 'Código de barras',
    field: 'barcode',
    fieldToSort: 'barcode',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Tentativas',
    field: 'attempts',
    fieldToSort: 'attempts',
    type: 'numeric',
    defaultSort: true,
  },
];
