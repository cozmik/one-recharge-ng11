import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'moneyFormatter'
})
export class MoneyFormatterPipe implements PipeTransform {

  transform(value: string): string {

    const myTransformed: string[] = [];
    if (value !== null) {
      for (const val of value.toString()) {
        if (!this.isLetter(val)) {
          myTransformed.push(val);
        }
      }
    }

    return myTransformed.join('');
  }

  isLetter(c): boolean {
    return c.toLowerCase() !== c.toUpperCase();
  }


}
