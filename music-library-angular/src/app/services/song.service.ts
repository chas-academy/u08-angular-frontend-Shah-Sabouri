import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiURL = 'https://u05-music-library-api.onrender.com/api/songs'

  constructor(private http: HttpClient) { }

  // HÄMTA ALLA LÅTAR
  getSongs(): Observable<Song> {
    return this.http.get<Song>(`${this.apiURL}`)
  }

  // HÄMTA LåT MED ID
  getSongById(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiURL}/${id}`)
  }

  // LÄGG TILL LÅT
  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.apiURL, song);
  }

  // UPPDATERA LÅT
  updateSong(id: string, song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.apiURL}/${id}`, song);
  }

  // RADERA LÅT
  deleteSong(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
