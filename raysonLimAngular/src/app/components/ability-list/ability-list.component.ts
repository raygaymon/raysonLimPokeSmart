import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbilityService } from 'src/app/services/ability.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-ability-list',
  templateUrl: './ability-list.component.html',
  styleUrls: ['./ability-list.component.css']
})
export class AbilityListComponent {

  private service = inject(AbilityService)
  abilities: string[] = []
  pages: number[] = []
  currentPage: number
  @Output() abilityName = new EventEmitter<string>();


  ngOnInit(): void {
    this.fillInPages(1)
    this.service.getAllAbilities(0).subscribe((response) => {
      for (let p of response['abilities']) {
        p = p.replace(/-/g, " ")
        this.abilities.push(p)
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

  fillInPagesMiddle(page: number){
    for (let i = page-10; i < (+page + +10); i++) {
      if (i <= 641) {
        this.pages.push(i)
      }
    }
  }

  goToPage(page: number) {
    this.abilities = []
    this.pages = []

    this.fillInPagesMiddle(page)
    console.log(+page * +20)

    this.service.getAllAbilities((+page * +20)).subscribe(response => {
      for (let p of response['abilities']) {
        p = p.replace(/-/g, " ")
        this.abilities.push(p)
      }
    })
  }

  sendAbilityName(name: string) {
    this.abilityName.emit(name.replace(/ /g, "-").toLowerCase())
    console.log(name)
  }
}
