import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthUserService} from '../../../services/auth-user.service';
import {SignupModel} from '../../../../models/signup.model';
import {UserModel} from '../../../../models/user.model';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf
  ],
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;  // Form group for user signup

  ngOnInit() {}

  constructor(
    private fb: FormBuilder, // For building the reactive form
    private authUserService: AuthUserService, // Auth service for user registration
    private snackBar: MatSnackBar // Snackbar for notifications
  ) {
    // Initialize the form with validation rules
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]], // Only letters allowed
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]], // Only letters allowed
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Only numbers allowed
      address: ['', [Validators.required, Validators.minLength(5)]], // At least 5 characters
      email: ['', [Validators.required, Validators.email]], // Must be a valid email
      password: ['', [Validators.required, Validators.minLength(6)]], // At least 6 characters
    });
  }

  /**
   * Handles user registration and automatic login.
   * Sends the signup data to the backend and, on success, logs the user in.
   */
  onSubmit() {
    if (this.signupForm.valid) {
      const signupData: SignupModel = this.signupForm.value;  // Extract form values

      // Register the user
      this.authUserService.register(signupData).subscribe({
        next: () => {
          const loginData: UserModel = {
            email: signupData.email,
            password: signupData.password
          };
          // Automatically log in after registration
          this.authUserService.login(loginData).subscribe({
            next: (response) => {
              // Save the user session
              localStorage.setItem('user', JSON.stringify(response)); // Save session
              this.snackBar.open('Registration and login successful', 'Close', { duration: 3000 });
              window.location.href = '/user/dashboard'; // Redirect to dashboard
            },
            error: () => this.snackBar.open('Login failed after registration', 'Close', { duration: 3000 })
          });
        },
        error: () => this.snackBar.open('Registration failed', 'Close', { duration: 3000 })
      });
    }
  }

  /**
   * Helper method to check control errors.
   */
  hasError(controlName: string, error: string) {
    const control = this.signupForm.get(controlName);
    return control && control.touched && control.hasError(error);
  }

}
