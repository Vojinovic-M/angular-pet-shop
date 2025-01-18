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
  private oAuthService = inject(OAuthService);
  private router = inject(Router);
  private profileSignal = signal<GoogleProfile | null>(null);

  constructor(private http: HttpClient, private storageService: StorageService) { this.initConfiguration() }

  private initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();

    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.profileSignal.set(JSON.parse(storedProfile));
    }

    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() =>{
      if (this.oAuthService.hasValidIdToken()) {
      const claims = this.oAuthService.getIdentityClaims() as GoogleProfile;
      console.log(claims);
      this.profileSignal.set(claims);
      localStorage.setItem('profile', JSON.stringify(claims));
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
    this.oAuthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        const googleProfile = this.getGoogleProfile()();
        if (googleProfile) {
          this.createGoogleUser(googleProfile);
        }
      }
    });
  }

  private createGoogleUser(googleProfile: GoogleProfile) {
    const userPayload = {
      googleId: googleProfile.sub,
      email: googleProfile.email,
      firstName: googleProfile.given_name,
      lastName: googleProfile.family_name
    };

    this.http.post('http://localhost:8080/user/create-google-user', userPayload)
    .subscribe({
      next: (response) => console.log('Google user created: ', response),
      error: (err) => console.log('Error creating Google user: ', err)
    });
  }



  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.profileSignal.set(null);
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
  }

  getGoogleProfile() {
    return computed(() => this.profileSignal());
  }
}
