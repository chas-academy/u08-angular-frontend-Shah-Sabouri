import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiURL = 'https://u05-music-library-api.onrender.com/api/songs'

  constructor(private http: HttpClient) { }

  // HÄMTA ALLA LÅTAR
  getSongs(id: string): Observable<any> {
    return this.http.get(`${this.apiURL}`)
  }

  // HÄMTA LåT MED ID
  getSongById(id: string): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`)
  }

  // LÄGG TILL LÅT
  addSong(song: any): Observable<any> {
    return this.http.post(this.apiURL, song);
  }

  // UPPDATERA LÅT
  updateSong(id: string, song: any): Observable<any> {
    return this.http.put<Song>(`${this.apiURL}/${id}`, song);
  }

  // RADERA LÅT
  deleteSong(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
