import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { SongService } from '../../services/song.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SongEditDrawerComponent } from '../../song-edit-drawer/song-edit-drawer.component';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SongEditDrawerComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})

export class SongListComponent implements OnInit {
  songs: Song[] = [];
  selectedSong: Song | null = null; // Låten vald för redigering/uppdatering

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

  openEditDrawer(song: Song) {
    this.selectedSong = song;
  }

  closeEditDrawer() {
    this.selectedSong = null;
  }
}
