
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongDrawerComponent } from './song-drawer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SongService } from '../services/song.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SongDrawerComponent', () => {
    let component: SongDrawerComponent;
    let fixture: ComponentFixture<SongDrawerComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [SongDrawerComponent, HttpClientTestingModule],
        providers: [SongService, {
            provide: ActivatedRoute, useValue: {
            params: of({ id: '123' }),
            snapshot: {
                paramMap: {
                get: () => '123'
                }
            }
            }
        }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(SongDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit close event when closeDrawer is called', () => {
        spyOn(component.close, 'emit');

        component.closeDrawer();

        expect(component.close.emit).toHaveBeenCalled();
    });
});
