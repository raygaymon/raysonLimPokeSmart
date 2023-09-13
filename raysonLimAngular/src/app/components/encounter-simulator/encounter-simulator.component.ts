import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EncounteredPokemon, Pokemon } from 'src/app/models';
import { LocationAreaService } from 'src/app/services/location-area.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encounter-simulator',
  templateUrl: './encounter-simulator.component.html',
  styleUrls: ['./encounter-simulator.component.css']
})
export class EncounterSimulatorComponent implements OnInit {

  private service = inject(LocationAreaService)
  private pokemonService = inject(PokemonService)
  private router = inject(Router)
  pokemonToFind = new Subject<Pokemon>()

  encounters: EncounteredPokemon[] = []
  chosenMethod: string
  displayMethod: string

  common: EncounteredPokemon[] = []
  uncommon: EncounteredPokemon[] = []
  rare: EncounteredPokemon[]= []
  veryRare: EncounteredPokemon[] = []
  encounterMethods: string[] = []

  encounter: EncounteredPokemon
  pokemon: Pokemon
  encounterLevel: number
  emptyList: boolean
  neverChooseMethod: boolean

  ngOnInit():void{

    this.encounters = this.service.encounters

    if (this.encounters.length > 0){
      this.emptyList = false;
      for (let ep of this.encounters){
        switch(true){
          case (ep.maxChance < 6):
            this.veryRare.push(ep)
            this.addEncounterMethods(ep.encounterMethods)
            break;
          case (ep.maxChance < 11):
            this.rare.push(ep)
            this.addEncounterMethods(ep.encounterMethods)
            break;
          case (ep.maxChance < 31):
            this.uncommon.push(ep)
            this.addEncounterMethods(ep.encounterMethods)
            break;
          default:
            this.common.push(ep)
            this.addEncounterMethods(ep.encounterMethods)
        }
      }
    } else {
      this.emptyList = true
    }
  }

  rollEncounterBracket(e: number){
    switch (e) {
      case 1 - 5:
        this.getEncounterFromArray(this.veryRare, this.chosenMethod)
        console.log(this.encounter)
        break;
      case 6 - 10:
        this.getEncounterFromArray(this.rare, this.chosenMethod)
        console.log(this.encounter)
        break;
      case 11 - 30:
        this.getEncounterFromArray(this.uncommon, this.chosenMethod)
        console.log(this.encounter)
        break;
      default:
        this.getEncounterFromArray(this.common, this.chosenMethod)
        console.log(this.encounter)
    }
  }

  shinyPokemon(){
    this.encounter = null
    let p = Math.floor(Math.random() * this.encounters.length)

    this.getEncounterFromArray(this.encounters, this.chosenMethod)
    this.encounter.name = this.encounter.name + "(Shiny)"

    this.encounter.minLevel = this.calcEncounterLevel(this.encounter.minLevel, this.encounter.maxLevel)

    console.log(this.encounter)
  }

  calcEncounterLevel (minLevel: number, maxLevel:number) : number{
    return Math.floor(Math.random() * (maxLevel - minLevel + 1) + minLevel)
  }

  getEncounterFromArray (encounters: EncounteredPokemon[], method: string){

    console.log("chosen method is " + method)
    this.displayMethod = method
    let possibleEncounters : EncounteredPokemon[] = []
    console.log(possibleEncounters.length)

    for (let ep of encounters){

      console.log(ep.encounterMethods)
      if (ep.encounterMethods.includes(method.toLowerCase())){
        console.log(ep.name + " pushed to possibleEncounters")
        possibleEncounters.push(ep)
      }

    }
    let p = Math.floor(Math.random() * (possibleEncounters.length - 1))
    console.log(possibleEncounters[p])
    this.encounter = possibleEncounters[p]
    
  }

  rollEncounter(){
      this.neverChooseMethod = false
      this.encounter = null
      let chance = Math.floor(Math.random() * 100)
      if ((chance/100) <= (1/8192)){
        this.shinyPokemon
      } else {
        this.rollEncounterBracket(chance)
      }
  }

  backToLocationList(){
    this.router.navigate(['./location-area'])
  }

  goToPokemon(name: string){
    console.log(name)
    this.pokemonService.getPokemonByName(name).subscribe((response)=>{
      console.log(response)
      this.pokemonService.pokemonNameFromEncounters = response.Pokemon
      this.pokemonService.emitPkmn(response.Pokemon)
    })

    this.router.navigate([`/pokemon/${name}`])
  }

  addEncounterMethods (methods: string[]){
    for (let m of methods){
      if (!this.encounterMethods.includes(m)){
        console.log(m + " added to encounter methods")
        this.encounterMethods.push(m)
      }
    }
  }

}
