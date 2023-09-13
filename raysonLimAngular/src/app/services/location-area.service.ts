import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EncounteredPokemon } from '../models';

const apiUrl = "/home/location-area"

@Injectable({
  providedIn: 'root'
})
export class LocationAreaService {

  constructor(private http: HttpClient) { }

  encounters: EncounteredPokemon[] = []

  getAllLocationAreas(){
    return this.http.get<any>(apiUrl)
  }

  changeOffset(offset: number){
    return this.http.get<any>(apiUrl, {
      params: {"offset": offset}
    })
  }

  getLocationAreaByName(name: string) {
    return this.http.get<any>(`${apiUrl}/${name}`)
  }
}
