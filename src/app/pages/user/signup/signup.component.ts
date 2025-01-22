import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthUserService} from '../../../services/auth-user.service';
import {NgIf} from '@angular/common';

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
      this.authUserService.register(this.signupForm.value).subscribe({
        next: () => this.snackBar.open('Registration successful', 'Close', { duration: 3000 }),
        error: () => this.snackBar.open('Registration failed', 'Close', { duration: 3000 })
      });
    }
  }
}
