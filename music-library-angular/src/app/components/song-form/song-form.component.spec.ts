import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SongFormComponent } from "./song-form.component"
import { SongService } from "../../services/song.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Song } from "../../models/song.model";
import { of } from "rxjs";

describe('SongFormComponent', () => {
    let component: SongFormComponent;
    let fixture: ComponentFixture<SongFormComponent>;
    let mockSongService: jasmine.SpyObj<SongService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockActivatedRoute: any;

    const dummySong: Song = {
        id: '3',
        title: 'Form Song',
        artist: 'Form Artist',
        genre: 'Form Genre',
        rating: 4
    };

    beforeEach(async () => {
        mockSongService = jasmine.createSpyObj('SongService', ['getSongById', 'addSong', 'updateSong']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => '3'
                }
            }
        };
        
        await TestBed.configureTestingModule({
            imports: [SongFormComponent],
            providers: [
                { provide: SongService, useValue: mockSongService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SongFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch song by ID on init if no input song is provided', () => {
        mockSongService.getSongById.and.returnValue(of(dummySong));
        component.song = { title: '', artist: '', genre: '', rating: 1, id: '' }

        component.ngOnInit();

        expect(mockSongService.getSongById).toHaveBeenCalledWith('3');
        expect(component.song).toEqual(dummySong);
        expect(component.originalSong).toEqual(dummySong);
    });

    it('should cancel edit and emit cancelEdit event', () => {
        const emitSpy = spyOn(component.cancelEdit, 'emit');
        component.song = { ...dummySong };
        component.originalSong = { ...dummySong, title: 'Original Title' };

        component.song.title = 'Modified Title';
        component.onCancel();

        expect(component.song.title).toBe('Original Title');
        expect(emitSpy).toHaveBeenCalled();
    });
})