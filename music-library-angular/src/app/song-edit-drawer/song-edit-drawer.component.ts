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

  // Kolla om det är en tom låt eller inte
  @Input() set song(value: Song | null) {
    if (value) {
      this._song = { ...value };
    } else {
      this._song = {} as Song;  // Om ingen låt skickas, skapa ett tomt objekt med rätt typ
    }
  }

  get song(): Song {
    return this._song;
  }

  @Output() cancelEditing = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() songUpdated = new EventEmitter<Song>();
  @Output() songAdded = new EventEmitter<Song>();

  constructor(private songService: SongService) {
    this.isMobile = window.innerWidth <= 768;  // Kontrollera skärmstorleken för mobil
  }

  closeDrawer() {
    this.close.emit();  // Sänd ut händelsen för att stänga drawern
  }

  onCancel() {
    this.cancelEditing.emit();
    this.closeDrawer();  // När man avbryter ska drawern stängas
  }

  onSongUpdated(updatedSong: Song) {
    if (this.song.id) {  // Om id finns så är detta en uppdatering
      this.songService.updateSong(updatedSong.id, updatedSong).subscribe({
        next: (data) => {
          this.songUpdated.emit(updatedSong); // Uppdatera listan i parent-komponenten
          this.closeDrawer();  // Stäng drawern efter uppdatering
        },
        error: (err) => {
          console.error('Kunde inte uppdatera låten:', err);
        }
      });
    } else {
      this.songService.addSong(updatedSong).subscribe({
        next: (data) => {
          this.songAdded.emit(data);
          this.closeDrawer();  // Stäng drawern efter tillägg
        },
        error: (err) => {
          console.error('Kunde inte lägga till låten:', err);
        }
      });
    }
  }
}
