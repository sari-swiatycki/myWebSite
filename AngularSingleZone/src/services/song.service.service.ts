import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { Song } from "../app/models/song.model"


@Injectable({
  providedIn: "root",
})
export class SongService {
  private apiUrl = "api/Songs"

  constructor(private http: HttpClient) {}

  searchSongs(keyword: string): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}/Search/${keyword}`)
  }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl)
  }

  deleteSong(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
}
