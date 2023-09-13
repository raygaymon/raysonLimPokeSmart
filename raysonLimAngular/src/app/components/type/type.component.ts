import { Component, Input } from '@angular/core';
import { Type } from 'src/app/models';



@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent {
  @Input('t') type: Type


  isListEmpty(toCheck: string[]){
    if(toCheck.length < 1){
      return true
    } else {
      return false
    }
  }
}
