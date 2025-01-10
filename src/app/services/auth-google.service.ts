import {computed, inject, Injectable, signal} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {authConfig} from '../auth-config';
import {GoogleProfile} from '../../models/google.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);
  private profileSignal = signal<GoogleProfile | null>(null);

  constructor() { this.initConfiguration() }

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
      this.profileSignal.set(claims);
      localStorage.setItem('profile', JSON.stringify(claims));
      }
    });
  }
  login() {
    this.oAuthService.initImplicitFlow()
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
