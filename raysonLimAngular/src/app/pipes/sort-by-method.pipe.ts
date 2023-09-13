import { Pipe, PipeTransform } from '@angular/core';
import { Moves } from '../models';

@Pipe({
  name: 'sortByMethod'
})
export class SortByMethodPipe implements PipeTransform {

  transform(
    input: Moves[]
  ): Moves[] {
    return input?.filter(item => item.moveLearnMethod === 'level-up');
  }

}
