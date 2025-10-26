// src/app/shared/components/search-results/search-results.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  SpotifyTrack,
  SpotifyArtist,
  SpotifyAlbum
} from '../../../core/models/spotify.models';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css'
})
export class SearchResults {
  readonly tracks = input<SpotifyTrack[]>([]);
  readonly artists = input<SpotifyArtist[]>([]);
  readonly albums = input<SpotifyAlbum[]>([]);
  readonly loading = input<boolean>(false);

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getArtistNames(artists: { name: string }[]): string {
    return artists.map((a) => a.name).join(', ');
  }
}