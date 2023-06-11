import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor() {}

  public onMenuToggle(): void {
    console.log('onMenuToggle');
  }
}
