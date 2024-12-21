import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {WebService} from '../../services/web.service';
import {AuthService} from '../../services/auth.service';
import {AuthGoogleService} from '../../services/auth-google.service';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
    selector: 'app-header',
  imports: [
    RouterLink,
    ThemeToggleComponent,
    NgIf,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authGoogle = inject(AuthGoogleService);
  private router = inject(Router);
  profile = this.authGoogle.getProfile();

  logOut() {
    this.authGoogle.logout();
    this.router.navigate(['/auth/login']);
  }
}
