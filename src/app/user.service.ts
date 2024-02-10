import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  userRegister(data:any){
    return this.http.post<string>("http://localhost:3000/register",data);
  }

  userLogin(data:any){
    return this.http.post<string>("http://localhost:3000/login",data);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  getMyToken(){
    return localStorage.getItem('token');
  }
}
