import { Columns } from 'src/app/shared/columns';

export interface ProductNotFoundDto {
  barcode: string;
  attempts: number;
}

export const productNotFoundColumns: Columns[] = [
  {
    name: 'Código de barras',
    field: 'barcode',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Tentativas',
    field: 'attempts',
    type: 'numeric',
    defaultSort: true,
  },
];
