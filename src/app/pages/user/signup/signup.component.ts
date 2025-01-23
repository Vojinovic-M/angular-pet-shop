import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthUserService} from '../../../services/auth-user.service';
import {NgIf} from '@angular/common';
import {SignupModel} from '../../../../models/signup.model';
import {UserModel} from '../../../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authUserService: AuthUserService,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupData: SignupModel = this.signupForm.value;

      // Register the user
      this.authUserService.register(signupData).subscribe({
        next: () => {
          // Automatically log in the user
          const loginData: UserModel = {
            email: signupData.email,
            password: signupData.password
          };

          this.authUserService.login(loginData).subscribe({
            next: (response) => {
              // Save the user session
              localStorage.setItem('user', JSON.stringify(response));
              this.snackBar.open('Registration and login successful', 'Close', { duration: 3000 });
              // Redirect to dashboard
              window.location.href = '/dashboard';
            },
            error: () => this.snackBar.open('Login failed after registration', 'Close', { duration: 3000 })
          });
        },
        error: () => this.snackBar.open('Registration failed', 'Close', { duration: 3000 })
      });
    }
  }

}
