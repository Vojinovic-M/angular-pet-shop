import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthUserService} from '../../../services/auth-user.service';
import {SignupModel} from '../../../../models/signup.model';
import {UserModel} from '../../../../models/user.model';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput
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
  signupForm: FormGroup;

  ngOnInit() {}

  constructor(
    private fb: FormBuilder,
    private authUserService: AuthUserService,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required, Validators.pattern('^[A-Za-z]+$')],
      lastName: ['', Validators.required, Validators.pattern('^[A-Za-z]+$')],
      phone: ['', Validators.required, Validators.pattern('^[0-9]+$')],
      address: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
