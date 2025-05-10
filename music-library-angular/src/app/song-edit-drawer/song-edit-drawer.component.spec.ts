import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SongEditDrawerComponent } from './song-edit-drawer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongService } from '../services/song.service';
import { Song } from '../models/song.model';

describe('SongEditDrawerComponent', () => {
    let component: SongEditDrawerComponent;
    let fixture: ComponentFixture<SongEditDrawerComponent>;
    let mockSongService: jasmine.SpyObj<SongService>;

    const mockSong: Song = {
        id: '6',
        title: 'Test Song',
        artist: 'Test Artist',
        genre: 'Test Genre',
        rating: 5
    };

    beforeEach(async () => {
        mockSongService = jasmine.createSpyObj('SongService', ['updateSong']);

        await TestBed.configureTestingModule({
        imports: [SongEditDrawerComponent],
        providers: [
            { provide: SongService, useValue: mockSongService },
            {
            provide: ActivatedRoute,
            useValue: {
                params: of({ id: '1' }),
                snapshot: {
                paramMap: {
                    get: (key: string) => '1'
                }
                }
            }
            }
        ]
        }).compileComponents();

        fixture = TestBed.createComponent(SongEditDrawerComponent);
        component = fixture.componentInstance;
        component.song = mockSong;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit cancelEditing and close on cancel', () => {
        spyOn(component.cancelEditing, 'emit');
        spyOn(component.close, 'emit');

        component.onCancel();

        expect(component.cancelEditing.emit).toHaveBeenCalled();
        expect(component.close.emit).toHaveBeenCalled();
    });

    it('should call updateSong and emit songUpdated on success', () => {
        spyOn(component.songUpdated, 'emit');
        spyOn(component, 'closeDrawer');
        mockSongService.updateSong.and.returnValue(of(mockSong));

        component.onSongUpdated(mockSong);

        expect(mockSongService.updateSong).toHaveBeenCalledWith(mockSong.id, mockSong);
        expect(component.songUpdated.emit).toHaveBeenCalledWith(mockSong);
        expect(component.closeDrawer).toHaveBeenCalled();
    });

    it('should log error on update failure', () => {
        const consoleSpy = spyOn(console, 'error');
        mockSongService.updateSong.and.returnValue(throwError(() => new Error('Update failed')));

        component.onSongUpdated(mockSong);

        expect(consoleSpy).toHaveBeenCalledWith('Kunde inte uppdatera låten:', jasmine.any(Error));
    });
});
