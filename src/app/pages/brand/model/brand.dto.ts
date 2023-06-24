import { Columns } from 'src/app/shared/columns';

export interface BrandDto {
  code: number;
  description: string;
  created_at: string;
}

export const brandColumns: Columns[] = [
  {
    name: 'Código',
    field: 'code',
    type: 'numeric',
  },
  {
    name: 'Descrição',
    field: 'description',
    type: 'text',
  },
  {
    name: 'Criação',
    field: 'created_at',
    type: 'date',
  },
];
