import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {AuthGoogleService} from '../../../services/auth-google.service';
import {MatInput} from '@angular/material/input';
import {AuthUserService} from '../../../services/auth-user.service';
import {HttpClient} from '@angular/common/http';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';

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
    // MatProgressSpinner,
    // NgIf
  ]
})
export class LoginComponent {
  private authGoogleService = inject(AuthGoogleService);
  private authUserService = inject(AuthUserService);
  private router = inject(Router);
  isLoading = false;

  loginData = {email: '', password: ''};

  constructor(private http: HttpClient) {
  }

  onSubmitLogin(){
    this.isLoading = true;
    this.authUserService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login response:', response);
        localStorage.setItem('username', this.loginData.email);
        localStorage.setItem('password', this.loginData.password);
        this.authUserService.saveSession(response);
        this.router.navigate(['/user/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Login failed: ',err);
        alert('Login failed, please check your credentials or refresh the page.');
      }
    })
  }

  signInWithGoogle() {
    this.authGoogleService.login();
  }
}
