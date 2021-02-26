import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatusFilter'
})
export class UserStatusFilterPipe implements PipeTransform {

  transform(items: any[], active: boolean, blocked: boolean): any[] {
    if(items.length === 0) return [];
    return items.filter(item =>{

      if (active && item.data.blocked === 0) {
        return true;
      }
      if (blocked && item.data.blocked === 1) {
        return true;
      }
      return false;
    });
  }

}
