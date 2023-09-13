import { Component, Input, OnInit } from '@angular/core';
import { Moves } from 'src/app/models';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit{

  @Input('m') m : Moves
  randomP : string[] = []

  ngOnInit(): void {
    this.getRandomPokemon()
  }

  getRandomPokemon(){

    for(let i = 0; i < 20; i ++ ){
      let r = Math.floor(Math.random() * this.m.learnedPokemonList.length)
      let p = this.m.learnedPokemonList[r]
      this.randomP.push(p)
    }
  }
}
