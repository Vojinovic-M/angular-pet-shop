import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthGoogleService} from '../../../services/auth-google.service';
import {MatButton} from '@angular/material/button';
import {AuthUserService} from '../../../services/auth-user.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from '@angular/material/card';
import {OrderComponent} from '../../order/order.component';

@Component({
    selector: 'app-dashboard',
  imports: [CommonModule, MatButton, MatCard, MatCardHeader, MatCardImage, MatCardTitle, MatCardContent, OrderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private authGoogleService = inject(AuthGoogleService);
  private authUserService = inject(AuthUserService);
  private router = inject(Router);

  googleProfile = this.authGoogleService.getGoogleProfile();
  userProfile = this.authUserService.getUserProfile();

  constructor() {}


  logOut() {
    this.authGoogleService.logout();
    this.authUserService.logout();
    this.router.navigate(['/user/login']);
  }
}
