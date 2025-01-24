import {computed, inject, Injectable, signal} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {authConfig} from '../auth-config';
import {GoogleProfile} from '../../models/google.model';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  // OAuth service for handling Google authentication.
  private oAuthService = inject(OAuthService);

  // Router for navigation.
  private router = inject(Router);

  // Reactive signal to store the Google profile.
  private profileSignal = signal<GoogleProfile | null>(null);

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.initConfiguration();
  }

  /**
   * Initializes the Google OAuth configuration and loads the user's profile if available.
   */
  private initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();

    // Load the profile from localStorage if available.
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.profileSignal.set(JSON.parse(storedProfile));
    }

    // Try logging in and retrieving identity claims if a valid token exists.
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() =>{
      if (this.oAuthService.hasValidIdToken()) {
      const claims = this.oAuthService.getIdentityClaims() as GoogleProfile;
      console.log(claims);
      this.profileSignal.set(claims);
      localStorage.setItem('profile', JSON.stringify(claims));
      }
    });
  }

  /**
   * Starts the Google login flow.
   */
  login() {
    this.oAuthService.initImplicitFlow();

    // Subscribe to OAuth events to handle token reception.
    this.oAuthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        const googleProfile = this.getGoogleProfile()();
        if (googleProfile) {
          this.createGoogleUser(googleProfile);
        }
      }
    });
  }

  /**
   * Sends a request to the backend to create a new Google user.
   * @param googleProfile - The Google profile to create.
   */
  private createGoogleUser(googleProfile: GoogleProfile) {
    const userPayload = {
      googleId: googleProfile.sub,
      email: googleProfile.email,
      firstName: googleProfile.given_name,
      lastName: googleProfile.family_name
    };

    this.http.post('http://localhost:8080/user/create-google-user', userPayload)
    .subscribe({
      // Handle a successful API response.
      next: (response) => console.log('Google user created: ', response),
      // Handle errors during the API request.
      error: (err) => console.log('Error creating Google user: ', err)
    });
  }


  /**
   * Logs the user out and clears their profile.
   */
  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.profileSignal.set(null);
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
  }

  /**
   * Retrieves the current Google profile as a reactive computed value.
   * @returns A computed reactive value of the Google profile.
   */
  getGoogleProfile() {
    return computed(() => this.profileSignal());
  }
}
