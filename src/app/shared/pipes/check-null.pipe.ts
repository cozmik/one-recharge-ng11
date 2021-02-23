import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkNull'
})
export class CheckNullPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (value ) {
      return value;
    }
    else if(args){
      return args;
    }
    else{
      return '-';
    }
  }

}
