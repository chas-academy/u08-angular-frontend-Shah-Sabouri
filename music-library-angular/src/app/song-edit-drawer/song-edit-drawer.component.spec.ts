import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditDrawerComponent } from './song-edit-drawer.component';

describe('SongEditDrawerComponent', () => {
  let component: SongEditDrawerComponent;
  let fixture: ComponentFixture<SongEditDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongEditDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongEditDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
