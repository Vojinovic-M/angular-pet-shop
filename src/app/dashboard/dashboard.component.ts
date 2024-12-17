import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthGoogleService} from '../services/auth-google.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private authService = inject(AuthGoogleService);
  private router = inject(Router);
  profile = this.authService.getProfile();

  logOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
