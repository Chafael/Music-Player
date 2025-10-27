import { Component, OnInit, signal, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SpotifyService } from '../../../core/services/spotify.service';
import { SpotifyTrack } from '../../../core/models/spotify.models';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon], 
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  protected readonly recommendations = signal<SpotifyTrack[]>([]);
  protected readonly loading = signal<boolean>(true);
  readonly trackSelected = output<SpotifyTrack>();

  constructor(private readonly spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  private loadRecommendations(): void {

    const queries = ['pop 2024', 'rock hits', 'latin music', 'electronic', 'indie'];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    
    this.spotifyService.search(randomQuery, 'track').subscribe({
      next: (response) => {
        this.recommendations.set(response.tracks?.items.slice(0, 5) || []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error cargando recomendaciones:', error);
        this.loading.set(false);
      }
    });
  }

  onTrackClick(track: SpotifyTrack): void {
    this.trackSelected.emit(track);
  }

  getArtistNames(artists: { name: string }[]): string {
    return artists.map((a) => a.name).join(', ');
  }
}