import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  private service = inject(PokemonService)
  pokemons: string[] = []
  pages: number[] =[]
  currentPage: number
  @Output() nameToSearch = new EventEmitter<string>();

  private fb = inject(FormBuilder)
  pageNavigation: FormGroup

  ngOnInit():void{
    this.fillInPages(1)
    this.service.getAllPokemon().subscribe((response)=> {
      for( let p of response.Pokemon){
        this.pokemons.push(p)
      }
    })
    this.pageNavigation = this.fb.group({
      'page': this.fb.control<number>(0)
    })
  }

  fillInPages(page: number) {
    for (let i = page; i <= (+page + +20); i++) {
      if(i <= 641){
        this.pages.push(i)
      }
    }
  }

  goToPage(page: number) {
    this.pokemons = []
    this.pages = []
    this.fillInPagesMiddle(page)
    console.log(+page * +20)
    this.service.changeOffset((+page * +20)).subscribe(response => {
      for (let p of response['Pokemon']) {
        this.pokemons.push(p)
      }
    })
  }

  fillInPagesMiddle(page: number) {
    for (let i = page - 10; i < (+page + +10); i++) {
      if (i <= 641) {
        this.pages.push(i)
      }
    }
  }

  page1() {
    this.pokemons = []
    this.pages = []
    this.fillInPages(1)

    this.service.changeOffset(0).subscribe(response => {
      for (let p of response['Pokemon']) {
        this.pokemons.push(p)
      }
    })
  }

  getPokemonDetails(name:string){
    this.nameToSearch.emit(name.toLowerCase())
    console.log(name)
  }
}
