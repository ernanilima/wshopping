import { Component, Input } from '@angular/core';
import { ProductDto } from 'src/app/pages/product/model/product.dto';

@Component({
  selector: 'app-result-product',
  templateUrl: './result-product.component.html',
})
export class ResultProductComponent {
  @Input() public product?: ProductDto;
}
