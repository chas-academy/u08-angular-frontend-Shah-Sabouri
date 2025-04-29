import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-song-list',
  imports: [],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})

export class SongListComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe({
      next: (data) => {
        this.songs = data;
      },
      error: (err) => {
        console.error('Fel vid hämtning av låtar', err);
      }
    });
  }
}
