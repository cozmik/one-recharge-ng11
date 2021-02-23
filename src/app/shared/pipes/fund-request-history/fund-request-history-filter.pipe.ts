import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fundRequestHistoryFilter'
})
export class FundRequestHistoryFilterPipe implements PipeTransform {

  transform(items: any[], approved: boolean, declined: boolean): any[] {
    if(items.length === 0) return [];
    return items.filter(item =>{

      if (approved && item.data.status === 1) {
        return true;
      }
      if (declined && item.data.status === -1) {
        return true;
      }
      return false;
    })
  }

}
