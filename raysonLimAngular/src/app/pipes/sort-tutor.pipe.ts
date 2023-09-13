import { Pipe, PipeTransform } from '@angular/core';
import { Moves } from '../models';

@Pipe({
  name: 'sortTutor'
})
export class SortTutorPipe implements PipeTransform {

  transform(
    input: Moves[]
  ): Moves[] {
    return input?.filter(item => item.moveLearnMethod === 'tutor');
  }
  

}
