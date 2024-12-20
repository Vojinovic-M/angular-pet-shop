import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {WebService} from '../../services/web.service';
import {AuthService} from '../../services/auth.service';
import {AuthGoogleService} from '../../services/auth-google.service';

@Component({
    selector: 'app-header',
  imports: [
    RouterLink,
    ThemeToggleComponent,
    NgIf
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  public webService!: WebService;
  private authGoogle = inject(AuthGoogleService);
  private router = inject(Router);

  profile = this.authGoogle.getProfile();

  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }

  constructor(webService: WebService, private authService: AuthService) {
    this.webService = webService;
  }
}
