import { Component, signal } from '@angular/core';
import { SearchResults } from '../search-results/search-results'; 
import { SpotifyService } from '../../../core/services/spotify.service';
import {
  SpotifyTrack,
  SpotifyArtist,
  SpotifyAlbum
} from '../../../core/models/spotify.models'; 

@Component({
  selector: 'app-main',
  imports: [SearchResults], 
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  protected readonly tracks = signal<SpotifyTrack[]>([]);
  protected readonly artists = signal<SpotifyArtist[]>([]);
  protected readonly albums = signal<SpotifyAlbum[]>([]);
  protected readonly loading = signal<boolean>(false);
  protected readonly hasSearched = signal<boolean>(false);
  protected readonly selectedTrack = signal<SpotifyTrack | null>(null);

  constructor(private readonly spotifyService: SpotifyService) {}

  handleSearch(query: string): void {
    this.loading.set(true);
    this.hasSearched.set(true);

    this.spotifyService.search(query).subscribe({
      next: (response) => {
        this.tracks.set(response.tracks?.items || []);
        this.artists.set(response.artists?.items || []);
        this.albums.set(response.albums?.items || []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error en búsqueda:', error);
        this.loading.set(false);
        this.tracks.set([]);
        this.artists.set([]);
        this.albums.set([]);
      }
    });
  }

  handleTrackSelect(track: SpotifyTrack): void {
    this.selectedTrack.set(track);
  }

  getSelectedTrack(): SpotifyTrack | null {
    return this.selectedTrack();
  }
}