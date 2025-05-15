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
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  selectedSong: Song | null = null;

  constructor(private songService: SongService) {
    this.songService.getNewSong.subscribe(song => {
      if (song) this.songs.push(song);
    });
  }

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    this.songService.getSongs().subscribe((data) => {
      this.songs = data;
    });
  }

  openEditDrawer(song: Song) {
    this.selectedSong = song;  // Öppna drawer när redigera-knappen trycks
  }

  closeEditDrawer() {
    this.selectedSong = null;  // Stänger drawer genom att sätta selectedSong till null
    
  }

  onSongUpdated(updatedSong: Song) {
    const index = this.songs.findIndex(s => s.id === updatedSong.id);
    if (index !== -1) {
      this.songs[index] = { ...updatedSong };
    }
    this.closeEditDrawer();  // Stäng drawer efter uppdatering
  }

  deleteSong(songId: string): void {
    if (confirm('Är du säker på att du vill ta bort denna låt?')) {
      this.songService.deleteSong(songId).subscribe({
        next: () => {
          this.songs = this.songs.filter(song => song.id !== songId);
        },
        error: (err) => {
          console.error('Fel vid borttagning:', err);
        }
      });
    }
  }
}
