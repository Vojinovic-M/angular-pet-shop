import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {AuthGoogleService} from '../../../services/auth-google.service';
import {MatInput} from '@angular/material/input';
import {AuthUserService} from '../../../services/auth-user.service';

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
    MatInput
  ]
})
export class LoginComponent {
  private authGoogleService = inject(AuthGoogleService);
  private authUserService = inject(AuthUserService);
  private router = inject(Router);

  loginData = {email: '', password: ''};

  onSubmitLogin(){
    this.authUserService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        this.authUserService.saveSession(response);
        this.router.navigate(['/user/dashboard']);
      },
      error: (err) => {
        console.log('Login failed: ',err);
        alert('Login failed, please check your credentials or refresh the page.');
      }
    })
  }

  signInWithGoogle() {
    this.authGoogleService.login();
  }
}
