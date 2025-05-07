import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SongFormComponent } from '../components/song-form/song-form.component';

@Component({
  selector: 'app-song-drawer',
  standalone: true,
  imports: [CommonModule, SongFormComponent],
  templateUrl: './song-drawer.component.html',
  styleUrl: './song-drawer.component.css'
})
export class SongDrawerComponent {
  @Output() close = new EventEmitter<void>();

  closeDrawer() {
    this.close.emit();
  }
}
