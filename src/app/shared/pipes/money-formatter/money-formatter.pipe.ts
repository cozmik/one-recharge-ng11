import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormatter'
})
export class MoneyFormatterPipe implements PipeTransform {

  transform(value: string): string {

    const myTransformed: string[] = [];

    for(let i = 0; i < value.length; i++) {
      if (!this.isLetter(value[i])) {
        myTransformed.push(value[i]);
      }
    }

    return myTransformed.join('');
  }

  isLetter(c): boolean {
    return c.toLowerCase()  !==  c.toUpperCase();
  }


}
