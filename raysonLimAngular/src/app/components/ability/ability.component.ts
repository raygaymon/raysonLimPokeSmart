import { Component, Input } from '@angular/core';
import { Abilities } from 'src/app/models';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.css']
})
export class AbilityComponent {
  @Input('a')a : Abilities

  ngOnInit():void{
    this.a.name = this.a.name.replace(/-/g, " ")
  }
}
