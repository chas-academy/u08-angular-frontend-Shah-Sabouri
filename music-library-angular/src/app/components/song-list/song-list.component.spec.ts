import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SongListComponent } from "./song-list.component";
import { SongService } from "../../services/song.service";
import { Song } from "../../models/song.model";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";

describe('SongListComponent', () => {
    let component: SongListComponent;
    let fixture: ComponentFixture<SongListComponent>;
    let mockSongService: jasmine.SpyObj<SongService>;

    const dummyListSongs: Song[] = [
        { id: '4', title: 'Song A', artist: 'Artist A', genre: 'Genre A', rating: 4 },
        { id: '5', title: 'Song B', artist: 'Artist B', genre: 'Genre B', rating: 5 }
    ];

    beforeEach(async () => {
        mockSongService = jasmine.createSpyObj('SongService', ['getSongs', 'deleteSong']);

        await TestBed.configureTestingModule({
        imports: [SongListComponent, RouterTestingModule],
        providers: [{ provide: SongService, useValue: mockSongService }]
        }).compileComponents();

        fixture = TestBed.createComponent(SongListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch songs on init', () => {
        mockSongService.getSongs.and.returnValue(of(dummyListSongs));
        fixture.detectChanges();

        expect(mockSongService.getSongs).toHaveBeenCalled();
        expect(component.songs.length).toBe(2);
    });

    it('should open edit drawer with selected song', () => {
        const song = dummyListSongs[0];
        component.openEditDrawer(song);
        expect(component.selectedSong).toEqual(song);
    });

    it('should close edit drawer', () => {
        component.selectedSong = dummyListSongs[0];
        component.closeEditDrawer();
        expect(component.selectedSong).toBeNull();
    });

    it('should delete song after confirmation', () => {
        spyOn(window, 'confirm').and.returnValue(true); // Simulerar en använder som bekräftar raderingen (trycker på 'OK')
        mockSongService.deleteSong.and.returnValue(of({}));
        component.songs = [...dummyListSongs];

        component.deleteSong('4');

        expect(mockSongService.deleteSong).toHaveBeenCalledWith('4');
        expect(component.songs.length).toBe(1);
        expect(component.songs.find(s => s.id === '4')).toBeUndefined();
    });

    it('should not delete song if confirmation is cancelled', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        component.songs = [...dummyListSongs];

        component.deleteSong('4');

        expect(mockSongService.deleteSong).not.toHaveBeenCalled();
        expect(component.songs.length).toBe(2);
    });

    it('should handle error during deletion', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const consoleSpy = spyOn(console, 'error');
        mockSongService.deleteSong.and.returnValue(throwError(() => new Error('Delete failed')));
        component.songs = [...dummyListSongs];

        component.deleteSong('4');

        expect(consoleSpy).toHaveBeenCalledWith('Fel vid borttagning:', jasmine.any(Error));
    });
});
