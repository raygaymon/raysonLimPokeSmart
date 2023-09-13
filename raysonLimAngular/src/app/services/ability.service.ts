import { Injectable } from '@angular/core';
import { Abilities } from '../models';
import { HttpClient } from '@angular/common/http';

const apiUrl = "/home/ability"

@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  ability: Abilities

  constructor(private http: HttpClient) { }

  getAbilityByName(name: string) {
    return this.http.get<any>(`${apiUrl}/${name}`)
  }

  getAllAbilities(offset: number){
    return this.http.get<any>(apiUrl, {
      params: {"offset" : offset}
    })
  }
}
