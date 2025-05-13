import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Song } from '../../models/song.model';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class SongFormComponent implements OnInit {
  @Input() song: Song = {
    title: '',
    artist: '',
    genre: '',
    rating: 1,
    id: '',
  };

  @Output() cancelEdit = new EventEmitter<void>();
  @Output() songUpdated = new EventEmitter<Song>();
  @Output() songCreated = new EventEmitter<Song>(); // Lägg till denna ifall du vill särskilja lägen

  originalSong: Song = {
    title: '',
    artist: '',
    genre: '',
    rating: 1,
    id: '',
  };

  isEditMode: boolean = false;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.song.id) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.songService.getSongById(id).subscribe({
          next: (data) => {
            this.song = data;
            this.originalSong = { ...data };
            this.isEditMode = true;
          },
          error: (err) => {
            console.error('Kunde inte hämta låten:', err);
          }
        });
      }
    } else {
      this.originalSong = { ...this.song };
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.songService.updateSong(this.song.id, this.song).subscribe({
        next: () => {
          this.songUpdated.emit(this.song);
        },
        error: (err) => console.error('Kunde inte uppdatera låt', err)
      });
    } else {
      this.songService.addSong(this.song).subscribe({
        next: (data: Song) => {
          this.song = data;
          this.songCreated.emit(this.song);
          this.cancelEdit.emit();
        },
        error: (err) => console.error('Kunde inte lägga till låt:', err)
      });
    }
  }

  onCancel(): void {
    this.song = { ...this.originalSong };
    this.cancelEdit.emit();
  }
}
