import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SpotifyAuthResponse } from '../models/spotify.models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private readonly accessToken = signal<string | null>(null);
  private readonly tokenExpiry = signal<number | null>(null);

  constructor(private readonly http: HttpClient) {}

  authenticate(): Observable<SpotifyAuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(
        `${environment.spotify.clientId}:${environment.spotify.clientSecret}`
      )}`
    });
    const body = 'grant_type=client_credentials';

    return this.http
      .post<SpotifyAuthResponse>(environment.spotify.authUrl, body, { headers })
      .pipe(
        tap((response) => {
          this.accessToken.set(response.access_token);
          this.tokenExpiry.set(Date.now() + response.expires_in * 1000);
        })
      );
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  isTokenValid(): boolean {
    const expiry = this.tokenExpiry();
    return expiry !== null && Date.now() < expiry;
  }
}