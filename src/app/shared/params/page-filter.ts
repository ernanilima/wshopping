import { FilterMetadata } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

export class PageFilter {
  public static of(event: TableLazyLoadEvent): string {
    if (Object.keys(event.filters).length === 0) return null;

    const filter = event.filters['global'];
    return filter && 'value' in filter
      ? (filter as FilterMetadata).value
      : null;
  }
}
