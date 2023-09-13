import { Pipe, PipeTransform } from '@angular/core';
import { Moves } from '../models';

@Pipe({
  name: 'sortEggMoves'
})
export class SortEggMovesPipe implements PipeTransform {

  transform(
    input: Moves[]
  ): Moves[] {
    return input?.filter(item => item.moveLearnMethod === 'egg');
  }

}
