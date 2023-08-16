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

export interface ProductDto {
  id?: string;
  barcode: string;
  description: string;
  brand: string;
  created_at: string;
}

export const productColumns: Columns[] = [
  {
    name: 'Código de barras',
    field: 'barcode',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Descrição',
    field: 'description',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Marca',
    field: 'brand',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Criação',
    field: 'created_at',
    type: 'date',
    defaultSort: true,
  },
];
