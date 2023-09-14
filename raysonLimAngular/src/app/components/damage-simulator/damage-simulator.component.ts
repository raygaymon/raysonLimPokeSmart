import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Moves, Pokemon, Type } from 'src/app/models';
import { MovesService } from 'src/app/services/moves.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TypeServiceService } from 'src/app/services/type-service.service';


@Component({
  selector: 'app-damage-simulator',
  templateUrl: './damage-simulator.component.html',
  styleUrls: ['./damage-simulator.component.css']
})
export class DamageSimulatorComponent {

  private servicePkmn = inject(PokemonService)
  private serviceMove = inject(MovesService)
  private serviceType = inject(TypeServiceService)

  pokemonAlly: Pokemon
  pokemonFoe: Pokemon
  moveToTest: Moves
  moveType: Type
  foeTypes: Type[] = []


  //to-do : get the simulated damage number > simulate damage > forum post with topic sentence and topic main body (upload pictures as well - get it uploaded to mysql to fulfill requirement)


  pokemonAllyName: string
  pokemonFoeName: string
  moveToTestName: string
  errMsg: string

  weather: string = 'no weather'
  weatherMultiplier: number = 1
  weatherType: string[] = ['no weather', 'rain', 'sun', 'snow', 'sandstorm', 'electric terrain', 'grassy terrain', 'misty terrain', 'psychic terrain']
  weatherEffect: string = "No Weather effects at the moment"
  boostStages: number[] = [-6, -5, -4, -3, -2, -1, 0, , 2, 3, 4, 5, 6]

  foeHp!: number
  remainingHp!: number
  remainingHpPercentage: number = 100
  remainingHpCrit!: number
  remainingHpPercentageCrit: number = 100
  hpIV: number = 0
  hpEV: number = 0

  foeDef!: number
  originalDef!: number
  statUsedDef!: string
  stageBoostDef: number
  defIV: number = 0
  defEV: number = 0

  beneficialNatureDef: boolean
  badNatureDef: boolean
  hpNatureMultiplier: number = 1

  allyAtk: number
  originalAtk: number
  statUsedAtk: string
  stageBoostAtk: number
  atkIV: number = 0
  atkEV: number = 0
  atkNatureMultiplier: number = 1

  damageLower: number
  damageUpper: number
  critUpper: number
  critLower: number

  beneficialNature: boolean
  badNature: boolean

  itemMultiplier: number = 1
  item: boolean
  stabMultiplier: number = 1
  stab: boolean
  typeMultiplier: number = 1
  choiceItem: boolean
  choiceMultiplier: number = 1
  screenUp: boolean
  screenMultiplier: number = 1
  burn: boolean
  burnMultiplier: number = 1

  getAllyPokemon() {
    this.pokemonAlly = null
    if (this.pokemonAllyName != null) {
      this.servicePkmn.getPokemonByName(this.pokemonAllyName.toLowerCase())
        .subscribe({
          next: (response) => {
            this.pokemonAlly = response.Pokemon
            console.log(this.pokemonAlly.stats.attack)
          },
          error: () => {
            this.errMsg = "Something went wrong, please double check the name you are searching"
          }
        }

        )
    }
  }

  getFoePokemon() {

    this.pokemonFoe = null
    if (this.pokemonFoeName != null) {
      this.servicePkmn.getPokemonByName(this.pokemonFoeName)
        .subscribe({
          next: (response) => {
            if (response instanceof HttpErrorResponse) {
              console.log(`status: ${response.status}, ${response.statusText}`);
              this.errMsg = `Error in GET retrieving pokemon: status: ${response.status}, ${response.statusText}`
            }
            else {
              this.pokemonFoe = response.Pokemon

              this.foeHp = Math.floor(0.01 * (2 * parseInt(this.pokemonFoe.stats.hp) + this.hpIV + Math.floor(0.25 * this.hpEV)) * 100) + 100 + 10;
              this.remainingHp = this.foeHp
              this.remainingHpPercentage = (this.remainingHp / this.foeHp) * 100
              console.log(this.remainingHpPercentage)

              for (let t of this.pokemonFoe.type) {
                let type: Type
                this.foeTypes = []
                this.serviceType.getTypeByName(t.name.toLowerCase()).subscribe((response) => {
                  type = response.Types
                  if (!this.foeTypes.includes(type)) {
                    this.foeTypes.push(type)
                  }
                })
              }
            }
          },
          error: () => {
            this.errMsg = "Something went wrong, please double check the name you are searching"
          }
        })
    }
  }

  updateHp() {
    this.foeHp = Math.floor(0.01 * (2 * parseInt(this.pokemonFoe.stats.hp) + this.hpIV + Math.floor(0.25 * this.hpEV)) * 100) + 100 + 10;
    this.remainingHp = this.foeHp
  }

  updateAtk() {

    if (this.moveToTest.damageType == "physical") {
      this.originalAtk = Math.floor((0.01 * ((2 * parseInt(this.pokemonAlly.stats.attack) + this.atkIV + Math.floor(0.25 * this.atkEV)) * 100) + 5) * this.atkNatureMultiplier)
    }

    if (this.moveToTest.damageType == "special") {
      this.originalAtk = Math.floor((0.01 * ((2 * parseInt(this.pokemonAlly.stats.specialAttack) + this.atkIV + Math.floor(0.25 * this.atkEV)) * 100) + 5) * this.atkNatureMultiplier)
    }
    this.allyAtk = this.originalAtk
    this.updateAtkBoosts()
  }

  updateAtkBoosts() {
    if (this.stageBoostAtk > 0) {
      this.allyAtk = this.allyAtk * (1 + (this.stageBoostAtk * 0.5))
    } else if (this.stageBoostAtk < 0) {
      this.allyAtk = this.allyAtk * (2 / ((this.stageBoostAtk * -1) + 2))
    } else {
      this.updateAtk()
    }
  }

  updateDefValue() {
    this.updateDef()
    this.updateDefBoosts()
  }

  updateDef() {

    if (this.moveToTest.damageType == "physical") {
      this.foeDef = Math.floor((0.01 * ((2 * parseInt(this.pokemonFoe.stats.defense) + this.defIV + Math.floor(0.25 * this.defEV)) * 100) + 5) * this.hpNatureMultiplier)
      this.originalDef = this.foeDef
    }

    if (this.moveToTest.damageType == "special") {
      this.foeDef = Math.floor((0.01 * ((2 * parseInt(this.pokemonFoe.stats.specialDefense) + this.defIV + Math.floor(0.25 * this.defEV)) * 100) + 5) * this.hpNatureMultiplier)
      this.originalDef = this.foeDef
    }
  }

  updateBeneficialNature() {
    if (this.beneficialNature == true) {
      this.atkNatureMultiplier = 1.1
      this.updateAtk()
    } else {
      this.atkNatureMultiplier = 1
      this.updateAtk()
    }
  }

  updateBadNature() {
    if (this.badNature == true) {
      this.allyAtk = Math.floor(this.allyAtk * 0.9)
    } else {
      this.allyAtk = this.originalAtk
    }
  }

  updateBeneficialNatureDef() {
    if (this.beneficialNatureDef == true) {
      this.hpNatureMultiplier = 1.1
      this.updateDef()
    } else {
      this.hpNatureMultiplier = 1
      this.updateDef()
    }
  }

  updateBadNatureDef() {
    if (this.badNatureDef == true) {
      this.hpNatureMultiplier = 0.9
      this.updateDef()
    } else {
      this.hpNatureMultiplier = 1
      this.updateDef()
    }
  }

  updateDefBoosts() {

    if (this.stageBoostDef > 0) {
      this.foeDef = this.foeDef * (1 + (this.stageBoostDef * 0.5))
    } else if (this.stageBoostDef < 0) {
      this.foeDef = this.foeDef * (2 / ((this.stageBoostDef * -1) + 2))
    } else {
      this.updateDef()
    }
  }

  updateChoiceItem() {

    if (this.choiceItem == true) {
      this.choiceMultiplier = 1.5
      this.allyAtk = Math.floor(this.allyAtk * this.choiceMultiplier)
    } else {
      this.choiceMultiplier = 1
      this.updateAtk()
    }
  }

  toggleBurn() {

    if (this.burn == true) {
      this.burnMultiplier = 0.5
    } else {
      this.burnMultiplier = 1
    }
  }

  toggleScreen() {

    if (this.screenUp == true) {
      this.screenUp = false
      this.screenMultiplier = 1
    } else {
      this.screenUp = true
      this.screenMultiplier = 0.5
    }
  }

  getMoveToTest() {
    this.moveToTest = null
    this.critLower = 0
    this.critUpper = 0
    this.damageLower = 0
    this.damageUpper = 0
    if (this.moveToTestName != null) {
      this.serviceMove.getMoveByName(this.moveToTestName.replace(/ /g, "-").toLowerCase())
        .subscribe({
          next: (response) => {

            this.moveToTest = response
            console.log(response.name + " capture success. Power = " + response.power)
            this.serviceType.getTypeByName(this.moveToTest.type.toLowerCase()).subscribe({
              next: (response) => {
                this.moveType = response.Types
                this.calcTypeEffectiveNess(this.moveType.name, this.foeTypes)
              },
              error: () => {
                this.errMsg = "Something went wrong. Please try again"
              }
            })

            for (let t of this.pokemonAlly.type) {

              if (this.moveToTest.type == t.name.toLowerCase()) {
                this.stab = true
                this.stabMultiplier = 1.5
              }
            }

            switch (this.moveToTest.damageType) {
              case "physical":

                this.allyAtk = Math.floor((0.01 * (2 * parseInt(this.pokemonAlly.stats.attack) + this.atkIV + Math.floor(0.25 * this.atkEV)) * 100) + 5)
                this.originalAtk = this.allyAtk
                this.statUsedAtk = "attack"

                this.foeDef = Math.floor(0.01 * ((2 * parseInt(this.pokemonFoe.stats.defense) + this.defIV + Math.floor(0.25 * this.defEV)) * 100) + 5)
                console.log(this.foeDef)
                this.originalDef = this.foeDef

                this.statUsedDef = "defense"
                break;

              case "special":

                this.allyAtk = Math.floor((0.01 * (2 * parseInt(this.pokemonAlly.stats.specialAttack) + this.atkIV + Math.floor(0.25 * this.atkEV)) * 100) + 5)
                this.originalAtk = this.allyAtk
                this.statUsedAtk = "special attack"

                this.foeDef = Math.floor(0.01 * ((2 * parseInt(this.pokemonFoe.stats.specialDefense) + this.defIV + Math.floor(0.25 * this.defEV)) * 100) + 5)
                console.log(this.foeDef)
                this.originalDef = this.foeDef
                this.statUsedDef = "special defense"
                break;
            }
          },
          error: () => {
            this.errMsg = "Something went wrong, please double check the name you are searching"
          }
        })


    }


  }

  checkWeatherMoveType(move: Moves, pkmnAlly: Pokemon, pkmnFoe: Pokemon) {
    console.log(this.weather)
    this.updateDef()
    switch (this.weather.toLowerCase()) {
      case "rain":
        this.weatherEffect = ("Water-type moves get a +50% boost & Fire-type moves get a - 50 % boost")
        if (move.type == "water") {
          
          this.weatherMultiplier = 1.5
        }
        if (move.type == "fire") {

          this.weatherMultiplier = 0.5
        }
        break;
      case "sun":
        this.weatherEffect = ("Fire-type moves get a +50% boost & Water-type moves get a - 50 % boost")

        if (move.type == "water") {
          this.weatherMultiplier = 0.5
        }
        if (move.type == "fire") {

          this.weatherMultiplier = 1.5
        }
        break;

      case "sandstorm":
        this.weatherEffect = ("Rock type pokemon get a +50% Special Defense boost")

        for (let t of this.foeTypes) {
          if ((t.name == 'rock') && (this.statUsedDef == 'special defense')) {
            this.foeDef = this.foeDef * 1.5
            console.log("special defense boosted")
            break;

          } else {
            console.log("oopies")
          }
        }
        break;

      case "snow":
        this.weatherEffect = ("Ice type pokemon get a +50% Defense boost")
        for (let t of pkmnFoe.type) {
          switch (t.name) {
            case "ice": {

              pkmnFoe.stats.defense = (parseInt(pkmnFoe.stats.defense) * 1.5).toString()
            }
          }
        }
        break;

      case "electric terrain":
        this.weatherEffect = ("Electric-type moves getting a 30% boost")
        if (move.type == "electric") {

          this.weatherMultiplier = 1.3
        }
        break;
      case "grassy terrain":
        this.weatherEffect = ("Grass-type moves getting a +30% boost")
        if (move.type == "grass") {
          this.weatherMultiplier = 1.3

        } else {
          console.log("oopsie")
        }
        break;
      case "misty terrain":
        this.weatherEffect = ("Dragon-type moves getting a -50% damage boost")
        if (move.type == "dragon") {

          this.weatherMultiplier = 0.5
        }
        break;
      case "psychic terrain":
        this.weatherEffect = ("Psychic-type moves getting a +30% damage boost")
        if (move.type == "psychic") {
          this.weatherMultiplier = 1.3
        }
        break;
      default:

        this.weatherEffect = ("No Weather effects at the moment")
        this.weatherMultiplier = 1;
    }
  }

  moveDmgFormulaNormal(): number {
    return ((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.allyAtk / this.foeDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier
  }
  moveDmgFormulaDefBoostCrit(): number {
    return ((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.allyAtk / this.originalDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier
  }

  moveDmgFormulaAtkDownCrit(): number {
    return ((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.originalAtk / this.foeDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier
  }

  moveDmgFormulaAtkDownDefUpCrit(): number {
    return ((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.originalAtk / this.originalDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier
  }

  calcMoveDamage() {

    this.damageLower =
      Math.floor(((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.allyAtk / this.foeDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * 0.85 * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier)

    this.damageUpper = Math.floor(this.moveDmgFormulaNormal())

    if (this.stageBoostDef > 0) {
      this.critUpper = Math.floor(this.moveDmgFormulaDefBoostCrit() * 1.5
      )
      this.critLower = Math.floor(((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.allyAtk / this.originalDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * 0.85 * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier * 1.5)

    } else if (this.stageBoostAtk < 0) {
      this.critUpper = Math.floor(this.moveDmgFormulaAtkDownCrit() * 1.5)

      this.critLower = Math.floor(((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.originalAtk / this.foeDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * 0.85 * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier * 1.5)

    } else if (this.stageBoostDef > 0 && this.stageBoostAtk < 0) {
      this.critUpper = Math.floor(this.moveDmgFormulaAtkDownDefUpCrit() * 1.5)

      this.critLower = Math.floor(((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.originalAtk / this.originalDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * 0.85 * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier * 1.5)

    } else {

      this.critUpper = Math.floor(this.moveDmgFormulaNormal() * 1.5)

      this.critLower = Math.floor(((((((2 * 100) / 5) + 2) * this.moveToTest.power * (this.allyAtk / this.foeDef)) / 50) + 2) * this.itemMultiplier * this.weatherMultiplier * 0.85 * this.stabMultiplier * this.typeMultiplier * this.burnMultiplier * this.screenMultiplier * 1.5)

    }

    this.remainingHp = this.foeHp - Math.floor((this.damageLower + this.damageUpper) / 2)
    this.remainingHpPercentage = Math.floor((this.remainingHp / this.foeHp) * 100)

    if (this.remainingHp < 0) {
      this.remainingHp = 0
    }
    if (this.remainingHpPercentage < 0) {
      this.remainingHpPercentage = 0
    }

    this.remainingHpCrit = this.foeHp - Math.floor((this.critUpper + this.critLower) / 2)
    this.remainingHpPercentageCrit = Math.floor((this.remainingHpCrit / this.foeHp) * 100)

    if (this.remainingHpCrit < 0) {
      this.remainingHpCrit = 0
    }
    if (this.remainingHpPercentageCrit < 0) {
      this.remainingHpPercentageCrit = 0
    }

    console.log(this.damageLower)
  }

  calcTypeEffectiveNess(moveType: string, foeTypes: Type[]) {

    let noEffect: number
    let resistance: number = 1
    this.typeMultiplier = 1

    for (let t of foeTypes) {
      console.log(t.name)
      let dmr = t.damage_relations

      if (dmr.double_damage_from.includes(moveType)) {
        console.log(t.name + " takes double damage from " + moveType)
        resistance *= 2
      }
      if (dmr.half_damage_from.includes(moveType)) {
        console.log(t.name + " takes half damage from " + moveType)
        resistance *= 0.5
      }
      if (dmr.no_damage_from.includes(moveType)) {
        console.log(t.name + " takes no damage from " + moveType)
        noEffect = 1
      }
    }

    if (noEffect == 1) {
      this.typeMultiplier = 0

    } else {
      this.typeMultiplier = resistance
    }
  }

}
