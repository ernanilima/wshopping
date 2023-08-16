import { TableLazyLoadEvent } from 'primeng/table';

interface PageQuery {
  sort: string;
  pageNumber: number;
  pageSize: number;
}

export interface PageBuilder {
  pageQuery: PageQuery;
  pageQueryString(): string;
}

export class PageParams implements PageBuilder {
  constructor(public pageQuery: PageQuery) {}

  public static of(event: TableLazyLoadEvent): PageParams {
    if (!event) return null;

    const sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
    return new PageParams({
      sort: `${event.sortField},${sortOrder}`,
      pageNumber: event.first / event.rows,
      pageSize: event.rows,
    });
  }

  public pageQueryString(): string {
    return Array.from(this._buildQueryMap())
      .map((item: string[]) => `${item[0]}=${item[1]}`)
      .join('&');
  }

  private _buildQueryMap(): Map<string, string> {
    return new Map<string, string>([...this._buildPageQueryMap()]);
  }

  private _buildPageQueryMap(): Map<string, string> {
    const buildPageQueryMap = new Map<string, string>();
    buildPageQueryMap.set('sort', `${this.pageQuery.sort}`);
    buildPageQueryMap.set('page', `${this.pageQuery.pageNumber}`);
    buildPageQueryMap.set('size', `${this.pageQuery.pageSize}`);
    return buildPageQueryMap;
  }
}
