import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private HttpClient:HttpClient) { }
  //Now here I will define the POST/PUT/DELETE/GET methods
  //Create Restaurant using post method
  postRestaurant(data: any):Observable<any> {
    return this.HttpClient.post<any>('http://localhost:3000/posts',data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  //Get Restaurant data using get method
  getRestaurant():Observable<any> {
    return this.HttpClient.get<any>('http://localhost:3000/posts')
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  //Update Restaurant using put method
  updateRestaurant(data: any, id: number):Observable<any> {
    return this.HttpClient.put<any>('http://localhost:3000/posts/'+id,data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  //Delete Restaurant using delete method
  deleteRestaurant(id: number):Observable<any> {
    return this.HttpClient.delete<any>('http://localhost:3000/posts/'+id)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  //END OF --> POST/GET/PUT/DELETE methods
}
