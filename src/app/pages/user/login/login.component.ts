import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {AuthGoogleService} from '../../../services/auth-google.service';
import {MatInput} from '@angular/material/input';
import {UserService} from '../../../services/user.service';

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
  private userService = inject(UserService);
  private router = inject(Router);

  loginData = {email: '', password: ''};

  onSubmitLogin(){
    this.userService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        this.userService.saveSession(response.token, response.user);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Login failed: ',err);
        alert('Login failed, please check your credentials.');
      }
    })
  }

  signInWithGoogle() {
    this.authGoogleService.login();
  }
}
