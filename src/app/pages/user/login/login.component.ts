import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {AuthGoogleService} from '../../../services/auth-google.service';
import {MatInput, MatInputModule} from '@angular/material/input';
import {AuthUserService} from '../../../services/auth-user.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgIf} from '@angular/common';
// import {MatProgressSpinner} from '@angular/material/progress-spinner';
// import {NgIf} from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
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
  // isLoading = false;
  // loginData = {email: '', password: ''}; // Form data for login
  loginForm!: FormGroup;

  constructor(private authUserService: AuthUserService,
              private router: Router,
              private fb: FormBuilder,
              private authGoogleService: AuthGoogleService,
              ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  /**
   * Handles user login using regular email and password.
   * Sends the credentials to the backend for verification.
   */
  onSubmitLogin(){
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;

      // this.isLoading = true;
      this.authUserService.login({email, password}).subscribe({
        next: (response) => {
          // this.isLoading = false;
          console.log('Login response:', response); // Log successful login
          // Save credentials in localStorage for Basic Auth
          localStorage.setItem('username', email);
          localStorage.setItem('password', password);
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
  }

  /**
   * Initiates Google sign-in using the AuthGoogleService.
   */
  signInWithGoogle() {
    this.authGoogleService.login();
  }

  /**
   * Helper method to check control errors.
   */
  hasError(controlName: string, error: string) {
    const control = this.loginForm.get(controlName);
    return control && control.touched && control.hasError(error);
  }
}
