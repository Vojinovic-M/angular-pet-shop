import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {AuthGoogleService} from '../../../services/auth-google.service';
import {MatInput} from '@angular/material/input';
import {AuthUserService} from '../../../services/auth-user.service';
import {animate, style, transition, trigger} from '@angular/animations';
// import {MatProgressSpinner} from '@angular/material/progress-spinner';
// import {NgIf} from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    RouterLink,
    // MatProgressSpinner,
    // NgIf
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class LoginComponent implements OnInit {
  private authGoogleService = inject(AuthGoogleService); // Dependency injection for Google auth service
  private authUserService = inject(AuthUserService); // Dependency injection for regular user auth service
  private router = inject(Router); // Router for navigation
  // isLoading = false;
  loginData = {email: '', password: ''}; // Form data for login

  /**
   * Handles user login using regular email and password.
   * Sends the credentials to the backend for verification.
   */
  onSubmitLogin(){
    // this.isLoading = true;
    this.authUserService.login(this.loginData).subscribe({
      next: (response) => {
        // this.isLoading = false;
        console.log('Login response:', response); // Log successful login
        // Save credentials in localStorage for Basic Auth
        localStorage.setItem('username', this.loginData.email);
        localStorage.setItem('password', this.loginData.password);
        // Save user session details
        this.authUserService.saveSession(response);
        // Navigate to the dashboard
        this.router.navigate(['/user/dashboard']);
      },
      error: (err) => {
        // this.isLoading = false;
        console.log('Login failed: ',err); // Log errors
        alert('Login failed, please check your credentials or refresh the page.');
      }
    })
  }

  /**
   * Initiates Google sign-in using the AuthGoogleService.
   */
  signInWithGoogle() {
    this.authGoogleService.login();
  }

  ngOnInit(): void {
  }
}
