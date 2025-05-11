import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SongFormComponent } from '../components/song-form/song-form.component';

@Component({
  selector: 'app-song-drawer',
  standalone: true,
  imports: [CommonModule, SongFormComponent],
  templateUrl: './song-drawer.component.html',
  styleUrls: ['./song-drawer.component.css']
})
export class SongDrawerComponent {
  @Output() close = new EventEmitter<void>();
  isMobile: boolean = false;

  constructor() {
    this.isMobile = window.innerWidth <= 768; // Kontrollera om enheten är mobil
  }

  closeDrawer() {
    this.close.emit();
  }
}
