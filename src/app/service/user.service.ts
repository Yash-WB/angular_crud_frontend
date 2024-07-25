import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserModel from '../Model/UserModel';
import GenderModel from '../Model/GenderModel';
import QueryModel from '../Model/QueryModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ApiURL = 'http://localhost:5029/api/user';
  constructor(private http: HttpClient) 
  { }

  getUserById(userId:number):Observable<UserModel>{
    const getUserURL = `${this.ApiURL}/${userId}`
    return this.http.get<UserModel>(getUserURL);
  }

  getUsers(queryModel: QueryModel):Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.ApiURL}/?start=${queryModel.start}&limit=${queryModel.limit}&q=${queryModel.searchTxt}&filter=${queryModel.filterTxt}`);
  }

  createUser(user: UserModel):Observable<UserModel>{
    return this.http.post<UserModel>(this.ApiURL, user);
  }

  updateUser(userId:number, user: UserModel):Observable<UserModel>{
    const updateURL = `${this.ApiURL}/${userId}`
    return this.http.put<UserModel>(updateURL, user);
  }

  deleteUserById(userId:number):Observable<any>{
    const deleteURL = `${this.ApiURL}/${userId}`
    return this.http.delete(deleteURL);
  }

  getGenders():Observable<GenderModel[]>{
    const urlGender = "http://localhost:5029/api/gender";
    return this.http.get<GenderModel[]>(urlGender);
  }
}
