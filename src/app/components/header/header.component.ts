import {Component, inject, signal} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {AuthGoogleService} from '../../services/auth-google.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {AuthUserService} from '../../services/auth-user.service';

@Component({
    selector: 'app-header',
  imports: [
    RouterLink,
    ThemeToggleComponent,
    NgIf,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatIcon,
    MatIconButton
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authGoogleService = inject(AuthGoogleService);
  private authUserService = inject(AuthUserService);
  private router= inject(Router);

  googleProfile = this.authGoogleService.getGoogleProfile();
  userProfile = this.authUserService.getUserProfile();

  isNavOpen = false;
  isSidenavOpen = false;

  constructor() {
    this.loadUserProfile();
  }

  private loadUserProfile() {
    const storedProfile = this.userProfile;
    if (storedProfile) {
      this.userProfile = storedProfile;
    }
  }


  logOut() {
    this.authGoogleService.logout();
    this.authUserService.logout();
    localStorage.removeItem('userProfile');
    this.router.navigate(['/auth/login']);
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
