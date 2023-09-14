import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRecord, SignUpRecord } from '../models';
import { Subject } from 'rxjs';

const apiUrl = "/api"

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  username : string
  errorMessage: string

  private tokenEmitter = new Subject<string>();
  public tokenEmitter$ = this.tokenEmitter.asObservable();


  createUser(signup: SignUpRecord){
    return this.http.post<any>(`${apiUrl}/register`, signup)
  }

  login(login: LoginRecord){
    return this.http.post<any>(`${apiUrl}/login`, login)
  }

  emitToken(x : any){
    this.tokenEmitter.next(x)
  }

}
