import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {

  private service = inject(ItemService)
  items: string[] = []
  pages : number[] = []
  @Output() sendName = new EventEmitter<string>();

  ngOnInit():void{

    this.fillInPages(1)
    this.service.getAllItems(0).subscribe((response) => {
      for(let i of response['Items']){
        i = i.replace(/-/g," ")
        this.items.push(i)
      }
    })
  }

  sendItemName(name: string){
    this.sendName.emit(name.replace(/ /g, "-").toLowerCase())
  }

  fillInPages(page: number) {
    for (let i = page; i <= page + 20; i++) {
      if (i <= 371 && i > 0) {
        this.pages.push(i)
      }
    }
  }

  goToPage(page: number) {
    this.items = []
    this.pages = []

    this.fillInPagesMiddle(page)
    console.log(+page + +20)

    this.service.getAllItems(page * +20).subscribe((response) => {
      for (let i of response['Items']) {
        i = i.replace(/-/g, " ")
        this.items.push(i)
      }
    })
  }

  fillInPagesMiddle(page: number) {
    for (let i = page - 10; i < (+page + +10); i++) {
      if (i <= 641 && i > 0) {
        this.pages.push(i)
      }
    }
  }
}
