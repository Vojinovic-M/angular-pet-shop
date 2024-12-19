import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(
      `${this.baseUrl}/auth/login`,
      { email, password }
    );
  }

  register(email: string, password: string, firstName: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, {
      email,
      password,
      firstName,
    });
  }

  loginWithGoogle(googleToken: string) {
    return this.http.post<{ token: string; user: any }>(
      `${this.baseUrl}/auth/google`,
      { googleToken }
    );
  }

  saveSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserName(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.firstName || 'Guest';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
