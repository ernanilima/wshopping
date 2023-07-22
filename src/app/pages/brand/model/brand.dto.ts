import { Columns } from 'src/app/shared/columns';

export interface BrandDto {
  code: number;
  description: string;
  total_products: number;
  created_at: string;
}

export const brandColumns: Columns[] = [
  {
    name: 'Código',
    field: 'code',
    type: 'numeric',
    defaultSort: true,
  },
  {
    name: 'Descrição',
    field: 'description',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Produtos',
    field: 'total_products',
    type: 'numeric',
  },
  {
    name: 'Criação',
    field: 'created_at',
    type: 'date',
  },
];
