import { Component, OnInit } from '@angular/core';
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
  song: Song = {
    title: '',
    artist: '',
    genre: '',
    rating: 1,
    id: '',
  };

  isEditMode = false;
  songId: string | null = null;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.songId = this.route.snapshot.paramMap.get('id');
    if (this.songId) {
      this.isEditMode = true;
      this.songService.getSongById(this.songId).subscribe({
        next: (data) => {
          this.song = data;
        },
        error: (err) => {
          console.error('Kunde inte hämta låten:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.songId) {
      // Om i "redigeringsläge", uppdateras låten
      this.songService.updateSong(this.songId, this.song).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Kunde inte uppdatera låt:', err)
      });
    } else {
      // Om i "skapa-läge", lägger man till ny låt
      this.songService.addSong(this.song).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Kunde inte lägga till låt:', err)
      });
    }
  }
  
}
