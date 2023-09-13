import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MovesService } from 'src/app/services/moves.service';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css']
})
export class MoveListComponent {

  private service = inject(MovesService)
  moves: string[] = []
  pages: number[] = []
  currentPage: number
  @Output() moveName = new EventEmitter<string>();


  ngOnInit(): void {
    this.fillInPages(1)
    this.service.getAllMoves(0).subscribe((response) => {
      for (let p of response['moves']) {
        p = p.replace(/-/g, " ")
        this.moves.push(p)
      }
    })
  }

  fillInPages(page: number) {
    for (let i = page; i < (+page + +20); i++) {
      if (i <= 641) {
        this.pages.push(i)
      }
    }
  }

  fillInPagesMiddle(page: number) {
    for (let i = page - 10; i < (+page + +10); i++) {
      if (i <= 641) {
        this.pages.push(i)
      }
    }
  }

  goToPage(page: number) {
    this.moves = []
    this.pages = []

    this.fillInPagesMiddle(page)
    console.log(+page * +20)

    this.service.getAllMoves((+page * +20)).subscribe(response => {
      for (let p of response['moves']) {
        p = p.replace(/-/g, " ")
        this.moves.push(p)
      }
    })
  }

  sendMoveName(name: string) {
    this.moveName.emit(name.replace(/ /g, "-").toLowerCase())
    console.log(name)
  }
}
