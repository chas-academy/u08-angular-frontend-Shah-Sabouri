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

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    this.songService.getSongs().subscribe((data) => {
      this.songs = data;
    });
  }

  openEditDrawer(song: Song) {
    this.selectedSong = song;
  }

  closeEditDrawer() {
    this.selectedSong = null;
  }

  deleteSong(songId: string): void {
    if (confirm('Är du säker på att du vill ta bort denna låt?')) {
      this.songService.deleteSong(songId).subscribe({
        next: () => {
          this.songs = this.songs.filter(song => song.id !== songId);
        },
        error: (err) => {
          console.error('Fel vid borttagning:', err)
        }
      });
    }
  }
}
