import { Columns } from 'src/app/shared/model/columns.model';

export interface BrandDto {
  id?: string;
  code: number;
  description: string;
  total_products: number;
  created_at: string;
}

export const brandColumns: Columns[] = [
  {
    name: 'Código',
    field: 'code',
    fieldToSort: 'code',
    type: 'numeric',
    defaultSort: true,
  },
  {
    name: 'Descrição',
    field: 'description',
    fieldToSort: 'description',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Produtos',
    field: 'total_products',
    fieldToSort: 'total_products',
    type: 'numeric',
  },
  {
    name: 'Criação',
    field: 'created_at',
    fieldToSort: 'created_at',
    type: 'date',
  },
];
