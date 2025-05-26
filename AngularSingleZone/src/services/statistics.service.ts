import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemStatisticsDto, UserStatisticsDto } from '../app/models/UserGrowth';
import { environment } from '../enviroment/environment';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  
  // private apiUrl = 'http://localhost:5120/api/Statistics';

  constructor(private http: HttpClient) { }

  // קריאה לסטטיסטיקות של משתמשים
  // getUserStatistics(): Observable<UserStatisticsDto[]> {
  //   return this.http.get<any>(`${environment.apiUrl}/Statistics/user-statistics`);
  // }

  // קריאה לסטטיסטיקות של המערכת
  getSystemStatistics(): Observable<SystemStatisticsDto> {
    return this.http.get<any>(`${environment.apiUrl}/Statistics/system-statistics`);
  }
}
