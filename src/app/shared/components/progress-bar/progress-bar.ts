import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SpotifyTrack } from '../../../core/models/spotify.models';

@Component({
  selector: 'app-progress-bar',
  imports: [MatIcon],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {

  readonly selectedTrack = input<SpotifyTrack | null>(null);


  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }


  getArtistNames(artists: { name: string }[]): string {
    return artists.map((a) => a.name).join(', ');
  }
}