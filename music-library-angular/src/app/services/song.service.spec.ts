import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SongService } from './song.service';
import { Song } from '../models/song.model';

describe('SongService', () => {
  let service: SongService;
  let httpMock: HttpTestingController;

  const dummySongs: Song[] = [
    { id: '1', title: 'Song 1', artist: 'Artist 1', genre: 'Pop', rating: 4 },
    { id: '2', title: 'Song 2', artist: 'Artist 2', genre: 'Rock', rating: 5 }
  ];
  
  const apiResponse = dummySongs.map(song => ({
    _id: song.id,
    title: song.title,
    artist: song.artist,
    genre: song.genre,
    rating: song.rating
  }));

  const apiUrl = 'https://u05-music-library-api.onrender.com/api/songs';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongService]
    });
    service = TestBed.inject(SongService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

it('should fetch all songs', () => {
  service.getSongs().subscribe((songs) => {
    expect(songs.length).toBe(2);
    expect(songs[0].id).toBe('1');
    expect(songs[1].id).toBe('2');
    expect(songs).toEqual(dummySongs);
  });

  const req = httpMock.expectOne(apiUrl);
  expect(req.request.method).toBe('GET');
  req.flush(apiResponse);
});

it('should fetch song by ID', () => {
  const songId = '1';
  service.getSongById(songId).subscribe((song) => {
    expect(song.id).toBe('1');
    expect(song).toEqual(dummySongs[0]);
  });

  const req = httpMock.expectOne(`${apiUrl}/${songId}`);
  expect(req.request.method).toBe('GET');
  req.flush({ ...dummySongs[0], _id: '1' });
});

  it('should add a new song', () => {
    const newSong: Song = { id: '3', title: 'New Song', artist: 'New Artist', genre: 'Jazz', rating: 3 };

    service.addSong(newSong).subscribe((song) => {
      expect(song).toEqual(newSong);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newSong);
  });

  it('should update an existing song', () => {
    const updatedSong: Song = { ...dummySongs[0], title: 'Updated Title' };

    service.updateSong(updatedSong.id, updatedSong).subscribe((song) => {
      expect(song).toEqual(updatedSong);
    });

    const req = httpMock.expectOne(`${apiUrl}/${updatedSong.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedSong);
  });

  it('should delete a song', () => {
    const songId = '1';

    service.deleteSong(songId).subscribe((res) => {
      expect(res).toBeNull(); // eftersom DELETE oftast returnerar tomt svar
    });

    const req = httpMock.expectOne(`${apiUrl}/${songId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
