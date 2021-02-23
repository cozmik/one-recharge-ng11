import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( item => {
      if(item.data.firstName === null || item.data.lastName === null || item.data.email === null || item.data.mobile === null) {return false}
      return item.data.firstName.toLowerCase().includes(searchText)
        || item.data.lastName.toLowerCase().includes(searchText)
        || item.data.email.toLowerCase().includes(searchText)
        || item.data.mobile.includes(searchText)
    });
  }

}
