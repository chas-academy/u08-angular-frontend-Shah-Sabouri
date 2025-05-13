import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SongDrawerComponent } from '../../song-drawer/song-drawer.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SongDrawerComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showDrawer = false;

  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  closeDrawer() {
    this.showDrawer = false;
  }

  goHome() {
    this.closeDrawer();  // Stänger drawer när Hem trycks
  }
}
