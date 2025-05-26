import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  //  private apiUrl= "http://localhost:5120/api/Users"



   getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Users`);
  }


   addUser(userName:string,email:string,password:string): Observable<any> 
    {     
      return this.http.post<any>(`${environment.apiUrl}/Users`,{userName,email,password});
    }
    getUserById(id: string): Observable<any> {
  
      return this.http.get<any>(`${environment.apiUrl}/Users/${id}`);
    }
   // פונקציה לעדכון קורס לפי ID
   updateUser(id: string, updates: any): Observable<any> {
  
    return this.http.put(`${environment.apiUrl}/Users/${id}`, updates)
  }
 
  // פונקציה למחיקת קורס לפי ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Users/${id}`);
  }
  getUserGrowthData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Users/growth`);
  }
}
