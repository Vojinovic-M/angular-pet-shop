import {inject, Injectable, signal} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {authConfig} from '../auth-config';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);
  profile = signal<any>(null);

  constructor() { this.initConfiguration() }

  private initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.profile.set(JSON.parse(storedProfile));
    }
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() =>{
      if (this.oAuthService.hasValidIdToken()) {
      const claims = this.oAuthService.getIdentityClaims();
      this.profile.set(claims);
      localStorage.setItem('profile', JSON.stringify(claims));
      }
    });
  }
  login() {
    this.oAuthService.initImplicitFlow()
  }
  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.profile.set(null);
    localStorage.removeItem('profile');
  }
  getProfile() {
    return this.profile();
  }
}
