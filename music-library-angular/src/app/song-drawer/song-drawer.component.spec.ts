import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDrawerComponent } from './song-drawer.component';

describe('SongDrawerComponent', () => {
  let component: SongDrawerComponent;
  let fixture: ComponentFixture<SongDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
