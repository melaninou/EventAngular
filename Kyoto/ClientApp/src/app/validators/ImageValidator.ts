import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export class ImageValidator {

  static validFile(fc: FormControl) {
    var fileName = fc.value;
    var fileExtention = fileName.substr(fileName.length - 4);
    if (fileExtention === '.jpg') {
      return (null);
    } else {
      return ({ notvalidfile: true });
    }
  }
}
