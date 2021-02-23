import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionStatusFilter'
})
export class TransactionStatusFilterPipe implements PipeTransform {

  transform(items: any[], success: boolean, pending:boolean, failed: boolean): any[] {
    if(items.length === 0) return [];
    return items.filter(item =>{

      if (success && item.data.status === 1) {
        return true;
      }
      if (failed && item.data.status === 0) {
        return true;
      }
      if (pending && item.data.status === -1) {
        return true;
      }
      return false;
    })
  }
}
