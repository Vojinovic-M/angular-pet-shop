import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: '575540839061-2pqadifgft86d3bkdcr8lj6m8tu5joph.apps.googleusercontent.com',
  scope: 'openid googleProfile email',
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true,
  useSilentRefresh: true
};
