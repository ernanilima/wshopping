import { DatePipe, TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(
    private _titlecase: TitleCasePipe,
    private _datePipe: DatePipe
  ) {}

  public filter<T>(dto: { description: string; created_at: string }): T {
    return {
      ...dto,
      description: this._titlecase.transform(dto.description),
      created_at: this._datePipe.transform(dto.created_at, 'dd/MM/yyyy HH:mm'),
    } as T;
  }
}
