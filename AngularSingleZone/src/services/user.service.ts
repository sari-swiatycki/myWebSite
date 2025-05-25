import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
   private apiUrl= "http://localhost:5120/api/Users"



   getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


   addUser(userName:string,email:string,password:string): Observable<any> 
    {     
      return this.http.post<any>(this.apiUrl,{userName,email,password});
    }
    getUserById(id: string): Observable<any> {
  
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
   // פונקציה לעדכון קורס לפי ID
   updateUser(id: string, updates: any): Observable<any> {
  
    return this.http.put(`${this.apiUrl}/${id}`, updates)
  }
  
  // פונקציה למחיקת קורס לפי ID
  deleteUser(id: string): Observable<any> {
  
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getUserGrowthData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/growth`);
  }
}
