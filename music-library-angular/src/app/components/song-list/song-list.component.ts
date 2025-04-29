import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { SongService } from '../../services/song.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})

export class SongListComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe({
      next: (songs) => {
        this.songs = songs;
        console.log('Låtar hittade:', songs);
      },
      error: (err) => {
        console.error('Fel vid hämtning av låtar', err);
      }
    });
  }

  deleteSong(id: string): void {
    this.songService.deleteSong(id).subscribe({
      next: () => {
        this.songs = this.songs.filter(song => song.id !== id);
      },
      error: (err) => {
        console.error('Fel vid radering av låt:', err);
      }
    });
  }
}
