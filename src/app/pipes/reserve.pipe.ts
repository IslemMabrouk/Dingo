import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reserve'
})
export class ReservePipe implements PipeTransform {

  transform(ch:string): any {
    let res:any=""
    for (let i = 0 ; i < ch.length ; i++) {
      res=ch[i]+res
      
    }
    return res
  }


}
