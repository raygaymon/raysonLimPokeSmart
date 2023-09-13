import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDash'
})
export class AddDashPipe implements PipeTransform {

  transform(value: string): unknown {

    if (value.includes("hm")){
      return value = "hm-normal"
    }
    if (value.includes("tm")){
      return value = "tm-normal"
    }
    
    return value.replace(/ /g, "-").toLowerCase();
  }

}
