import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {AuthGoogleService} from '../../services/auth-google.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';
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

  openNav() {
    document.getElementById('mySidenav')!.style.width = '250px';
  }
  closeNav() {
    document.getElementById('mySidenav')!.style.width = '0px';
  }
}
