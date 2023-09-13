import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent {

  @Output() searchedPokemon = new EventEmitter<Pokemon>();

  service = inject(PokemonService)
  private router = inject(Router)
  pokemonResult = []
  pp: Pokemon

  private fb = inject(FormBuilder)
  pokemonSearch: FormGroup

  ngOnInit(): void {
    this.pokemonSearch = this.createSearch()
  }

  getPokemonByName(name: string) {
    this.service.getPokemonByName(name).subscribe((pokemon) => {
      let p: Pokemon
      p = pokemon.Pokemon
      this.pp = pokemon.Pokemon
      this.service.emitPkmn(p)
      this.pokemonResult.push(p)
      console.log(p)
    })
  }

  createSearch() {
    return this.fb.group({
      'name': this.fb.control<string>('')
    })
  }

  searchPokemon() {
    let pokemonName: string = this.pokemonSearch.get('name').value
    this.getPokemonByName(pokemonName)
    console.log(pokemonName + " detected, calling from api")
    console.log(this.pokemonResult[0])
  }

  backToList(){
    this.pp = null
  }

  onPokemonClicked(name: string){
    if(name){
    this.getPokemonByName(name)
    console.log(name + " detected, calling from api")
    console.log(this.pokemonResult[0])
    } else {
      console.log("something fucked up")
    }
    
  }
}
