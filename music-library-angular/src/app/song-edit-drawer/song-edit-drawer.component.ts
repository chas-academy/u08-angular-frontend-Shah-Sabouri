import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Song } from '../models/song.model';
import { CommonModule } from '@angular/common';
import { SongFormComponent } from '../components/song-form/song-form.component';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-song-edit-drawer',
  standalone: true,
  imports: [CommonModule, SongFormComponent],
  templateUrl: './song-edit-drawer.component.html',
  styleUrls: ['./song-edit-drawer.component.css']
})
export class SongEditDrawerComponent {
  private _song!: Song;
  isMobile: boolean = false;

  @Input() set song(value: Song) {
    this._song = { ...value };
  }

  get song(): Song {
    return this._song;
  }

  @Output() cancelEditing = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() songUpdated = new EventEmitter<Song>();

  constructor(private songService: SongService) {
    this.isMobile = window.innerWidth <= 768;  // Kontrollera skärmstorleken för mobil
  }

  closeDrawer() {
    this.close.emit();
  }

  onCancel() {
    this.cancelEditing.emit();
    this.close.emit();
  }

  onSongUpdated(updatedSong: Song) {
    this.songService.updateSong(updatedSong.id, updatedSong).subscribe({
      next: (data) => {
        this._song = { ...updatedSong };
        this.songUpdated.emit(updatedSong);
        this.closeDrawer();
      },
      error: (err) => {
        console.error('Kunde inte uppdatera låten:', err);
      }
    });
  }
}
