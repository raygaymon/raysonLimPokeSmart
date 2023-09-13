import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models';

const apiUrl = "/home/item"

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  item: Item

  constructor(private http: HttpClient) { }

  getItemByName(name: string) {
    return this.http.get<any>(`${apiUrl}/${name}`)
  }

  getAllItems(offset: number){
    return this.http.get<any>(apiUrl, {
      params: {"offset": offset}
    })
  }
}
