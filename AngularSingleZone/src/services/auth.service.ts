import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'http://localhost:5120/api/Auth'; // כאן תשים את ה-URL של ה-API שלך

   constructor(private http: HttpClient) { }
   register(userName:string, email: string, password: string, roleName: string): Observable<any> {
     const user = { userName, email, password, roleName };
     return this.http.post(`${environment.apiUrl}/register` , user);
   }
 
   login(userName: string, password: string): Observable<any> {
     const credentials = { userName, password };
     return this.http.post(`${environment.apiUrl}/Auth/login` , credentials);
   }
}