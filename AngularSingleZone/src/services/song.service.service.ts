// import { Injectable } from "@angular/core"
// import type { HttpClient } from "@angular/common/http"
// import type { Observable } from "rxjs"
// import { Song } from "../app/models/song.model"
// import { environment } from "../enviroment/environment"


// @Injectable({
//   providedIn: "root",
// })
// export class SongService {
//   private apiUrl = "api/Songs"

//   constructor(private http: HttpClient) {}

//   searchSongs(keyword: string): Observable<Song[]> {
//     return this.http.get<Song[]>(`${environment.apiUrl}/Search/${keyword}`)
//   }

//   getAllSongs(): Observable<Song[]> {
//     return this.http.get<Song[]>(this.apiUrl)
//   }

//   deleteSong(id: number): Observable<boolean> {
//     return this.http.delete<boolean>(`${environment.apiUrl}/${id}`)
//   }
// }
