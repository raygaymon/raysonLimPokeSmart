import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortMoves'
})
export class SortMovesPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((n1, n2) => {
      return n1.levelLearnedAt - n2.levelLearnedAt;
    });
  }
}
