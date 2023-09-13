import { Pipe, PipeTransform } from '@angular/core';
import { Moves } from '../models';

@Pipe({
  name: 'sortTMHM'
})
export class SortTMHMPipe implements PipeTransform {

  transform(
    input: Moves[]
  ): Moves[] {
    return input?.filter(item => item.moveLearnMethod === 'machine');
  }

}
