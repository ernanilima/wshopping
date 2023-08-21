import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldToTable',
})
export class FieldToTablePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public transform(item: any, field: string): string {
    const properties = field.split('.');
    return properties.reduce((obj, fieldSplit) => obj[fieldSplit], item);
  }
}
