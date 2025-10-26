import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { SpotifyAuthService } from './spotify-auth.service';
import { SpotifySearchResponse } from '../models/spotify.models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly apiUrl = 'https://api.spotify.com/v1';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: SpotifyAuthService
  ) {}

  search(query: string, type: string = 'track,artist,album'): Observable<SpotifySearchResponse> {
    return this.ensureAuthenticated().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        const params = {
          q: query,
          type: type,
          limit: '10'
        };
        return this.http.get<SpotifySearchResponse>(`${this.apiUrl}/search`, {
          headers,
          params
        });
      })
    );
  }

  private ensureAuthenticated(): Observable<string> {
    if (this.authService.isTokenValid()) {
      return of(this.authService.getAccessToken()!);
    }
    return this.authService.authenticate().pipe(
      switchMap(() => of(this.authService.getAccessToken()!))
    );
  }
}