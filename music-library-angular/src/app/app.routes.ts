import { Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongFormComponent } from './components/song-form/song-form.component';

export const routes: Routes = [
    { path: '', component: SongListComponent },
    { path: 'add', component: SongFormComponent},
    { path: 'edit/:id', component: SongFormComponent },
];