import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'airtimeTransactionsFilter'
})
export class TransactionsPipe implements PipeTransform {


  transform(items: any[], searchText: string): any[] {
    console.log('******* items ******');
    console.log(items);
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( item => {
      if(item.data.firstName === null || item.data.lastName === null || item.data.email === null || item.data.toMsisdn === null) {return false}
      return item.data.firstName.toLowerCase().includes(searchText)
        || item.data.lastName.toLowerCase().includes(searchText)
        || item.data.email.toLowerCase().includes(searchText)
        || item.data.toMsisdn.includes(searchText)
    });
  }

}
