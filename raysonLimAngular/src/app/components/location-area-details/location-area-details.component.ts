import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocationArea } from 'src/app/models';
import { LocationAreaService } from 'src/app/services/location-area.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-location-area-details',
  templateUrl: './location-area-details.component.html',
  styleUrls: ['./location-area-details.component.css']
})
export class LocationAreaDetailsComponent {

  la : LocationArea
  private service = inject(LocationAreaService)
  private pokemonService = inject(PokemonService)
  conditions: string[] = []
  private router = inject(Router)

  onNameReceived(name: string){
    this.service.getLocationAreaByName(name).subscribe((response) => {
      this.la = response
      this.la.name = response.name.replace(/-/g, " ")
      console.log(response)
      this.service.encounters = this.la.pokemonEncounters
    })
  }

  backToList(){
    this.la = null
  }

  goToSimulator(){
    this.router.navigate(['/encounter-simulator'])
  }

  goToPokemon(name: string) {
    console.log(name)
    this.pokemonService.getPokemonByName(name).subscribe((response) => {
      console.log(response)
      this.pokemonService.pokemonNameFromEncounters = response.Pokemon
      this.pokemonService.emitPkmn(response.Pokemon)
    })

    this.router.navigate([`/pokemon/${name}`])
  }

}
