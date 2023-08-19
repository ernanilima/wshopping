import { FormGroup } from '@angular/forms';

export class ValidatorsService {
  public static spacesRegex = '^(?!\\s|.*\\s{2,}).*$';
  public static numbersRegex = '^\\d+$';

  public static getErrorMessage(field: string, form: FormGroup): string {
    const error = form.get(field)?.errors;
    if (error?.['required']) {
      return 'Campo deve ser preenchido';
    } else if (
      error?.['pattern'] &&
      error?.['pattern']['requiredPattern'] === ValidatorsService.spacesRegex
    ) {
      return 'Campo com espaços inválidos';
    } else if (
      error?.['pattern'] &&
      error?.['pattern']['requiredPattern'] === ValidatorsService.numbersRegex
    ) {
      return 'Campo deve conter apenas números';
    } else if (error?.['minlength']) {
      return `Campo deve conter no mínimo ${error['minlength']['requiredLength']} caractere(s)`;
    } else if (error?.['maxlength']) {
      return `Campo deve conter no máximo ${error['maxlength']['requiredLength']} caractere(s)`;
    } else {
      return '';
    }
  }
}
