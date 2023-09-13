import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models';
import { Observable, Subject } from 'rxjs';

const apiUrl = "/home/pokemon"


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonNameFromEncounters: Pokemon
  private pkmn = new Subject<any>();
  public pkmn$ = this.pkmn.asObservable();

  constructor(private http: HttpClient) { }

  getPokemonByName(name : string){
    return this.http.get<any>(apiUrl + `/name/${name}`)
  }

  getAllPokemon(){
    return this.http.get<any>(apiUrl + `/all`)
  }

  changeOffset(offset: number) {
    return this.http.get<any>(apiUrl + `/all`, {
      params: { "offset": offset }
    })
  }

  emitPkmn (x : any){
    console.log("data emission in progress")
    this.pkmn.next(x)
  }

  handleError(operation: String) {
    return (err: any) => {
      let errMsg = `Error in ${operation}() retrieving ${apiUrl}`;

      console.log(`${errMsg}:`, err)
      if (err instanceof HttpErrorResponse) {
        console.log(`status: ${err.status}, ${err.statusText}`);
        // errMsg = ...
        errMsg = errMsg + `: status: ${err.status}, ${err.statusText}`
      }
      return errMsg;
    }
  }
}
