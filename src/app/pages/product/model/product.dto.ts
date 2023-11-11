import { Columns } from 'src/app/shared/model/columns.model';
import { BrandDto } from '../../brand/model/brand.dto';

export interface ProductDto {
  id?: string;
  barcode: string;
  description: string;
  brand: BrandDto;
  created_at: string;
}

export const productColumns: Columns[] = [
  {
    name: 'Código de barras',
    field: 'barcode',
    fieldToSort: 'barcode',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Descrição',
    field: 'description',
    fieldToSort: 'description',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Marca',
    field: 'brand.description',
    fieldToSort: 'brand',
    type: 'text',
    defaultFilter: true,
  },
  {
    name: 'Criação',
    field: 'created_at',
    fieldToSort: 'created_at',
    type: 'date',
    defaultSort: true,
  },
];
