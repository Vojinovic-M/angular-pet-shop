import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthUserService} from '../../../services/auth-user.service';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

/**
 * EditComponent allows users to update their profile information.
 * The form includes fields for first name, last name, phone number, and address,
 * and is pre-populated with the current user's information.
 */
@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class EditComponent implements OnInit {
  // Form group to manage and validate the profile update form
  editForm!: FormGroup;
  // Stores the current user's email (non-editable)
  userEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private authUserService: AuthUserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    // Initialize the form with default validators for each field
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      phone: ['', [Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  /**
   * Lifecycle hook to fetch and prefill user data when the component initializes.
   */
  ngOnInit(): void {
    // Fetch the current user profile from localStorage (via service)
    const currentUser = this.authUserService.getUserProfile();
    if (currentUser) {
      // Pre-fill the form with user details
      this.userEmail = currentUser.email;
      this.editForm.patchValue({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        address: currentUser.address,
      });
    } else {
      // If no user is logged in, display an error message
      this.snackBar.open('No user logged in.', 'Close', { duration: 3000 });
    }
  }

  /**
   * Handles form submission and updates the user's profile.
   * Makes a request to the backend with the updated profile information.
   */
  onSubmit(): void {
    if (this.editForm.valid) {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      const email = this.userEmail;

      if (username && password && email) {
        // Adds the email to the payload
        const updatePayload = {
          ...this.editForm.value,
          email: email,
        };
          this.authUserService.updateUser(updatePayload, username, password).subscribe({
            next: (response) => {
              this.snackBar.open(response, 'Close', { duration: 3000 });
              this.router.navigate(['/user/dashboard']);
            },
            error: (error) => {
              this.snackBar.open('Failed to update user profile', 'Close', { duration: 3000 })
              console.log(error);
            }
          });
      } else {
        // Notify the user if authentication details are missing
          this.snackBar.open('User not found. Please try again after logging in.', 'Close', { duration: 5000 });
      }
    }
  }

  /**
   * Cancels the editing process and redirects to the dashboard.
   */
  cancelEdit(): void {
    this.router.navigate(['/user/dashboard']); // Redirect to dashboard
  }

}
