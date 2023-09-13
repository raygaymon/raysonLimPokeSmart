import { Component, Input, OnInit, inject } from '@angular/core';
import { Fling, Item } from 'src/app/models';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  private service = inject(ItemService)
  @Input('i')item : Item

  ngOnInit () : void {

  }
}
