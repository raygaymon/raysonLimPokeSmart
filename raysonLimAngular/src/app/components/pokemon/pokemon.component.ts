import { Component, inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit{

  constructor(private route: ActivatedRoute, private service: PokemonService, private router: Router ){}

  movesFilter:number = 1

  ngOnInit(): void {

    this.service.pkmn$.subscribe((data) => {
      console.log(data)
      console.log("data emission received for " + data.name)
      this.pokemonElement = data
    })
  }

  @Input('p') pokemonElement: Pokemon

  backToPokemonList(){
    this.router.navigate(['/pokemon'])
  }

  toggleLevel() {
    this.movesFilter = 1
    this.pokemonElement.moves.filter( x => {return x.moveLearnMethod === "level-up"})
    this.pokemonElement.moves.filter( x => {return x.levelLearnedAt === 0})
  }

  toggletmhm() {
    this.movesFilter = 2
    this.pokemonElement.moves.filter(x => { return x.moveLearnMethod === "machine" })
  }
  toggleEgg() {
    this.movesFilter = 4
  }
  toggleTutor() {
    this.movesFilter = 3
  }
}
