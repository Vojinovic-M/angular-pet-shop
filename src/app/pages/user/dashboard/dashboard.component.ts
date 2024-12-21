import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthGoogleService} from '../../../services/auth-google.service';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private authGoogle = inject(AuthGoogleService);
  private router = inject(Router);
  profile = this.authGoogle.getProfile();

  logOut() {
    this.authGoogle.logout();
    this.router.navigate(['/auth/login']);
  }
}
