import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Song } from '../models/song.model';
import { CommonModule } from '@angular/common';
import { SongFormComponent } from '../components/song-form/song-form.component';

@Component({
  selector: 'app-song-edit-drawer',
  standalone: true,
  imports: [CommonModule, SongFormComponent],
  templateUrl: './song-edit-drawer.component.html',
  styleUrls: ['./song-edit-drawer.component.css']
})
export class SongEditDrawerComponent {
  @Input() song!: Song;
  @Output() close = new EventEmitter<void>();

  closeDrawer() {
    this.close.emit();
  }
}
