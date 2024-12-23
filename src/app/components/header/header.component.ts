import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {AuthGoogleService} from '../../services/auth-google.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {ChatComponent} from '../chat/chat.component';

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
    MatDrawerContainer,
    MatDrawer,
    MatIcon,
    MatIconButton,
    RouterOutlet,
    ChatComponent
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authGoogle = inject(AuthGoogleService);
  private router = inject(Router);
  profile = this.authGoogle.getProfile();
  isNavOpen = false;
  isSidenavOpen = false;
  showFiller = false;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logOut() {
    this.authGoogle.logout();
    this.router.navigate(['/auth/login']);
  }
}
