import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';

const apiUrl = "/home/types"

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  constructor(private http: HttpClient){}


  getTypeByName(name: string){
    return this.http.get<any>(`${apiUrl}/${name}`)
  }

  getAllTypes() {
    return this.http.get<any>(apiUrl)
  }
}
