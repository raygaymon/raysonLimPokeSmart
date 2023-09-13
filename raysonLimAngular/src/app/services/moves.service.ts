import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl = "/home/moves"

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  constructor(private http: HttpClient) { }

  getMoveByName(name: string) {
    return this.http.get<any>(`${apiUrl}/${name}`)
  }

  getAllMoves(offset: number) {
    return this.http.get<any>(apiUrl, {
      params: {"offset" : offset}
    })
  }
}
