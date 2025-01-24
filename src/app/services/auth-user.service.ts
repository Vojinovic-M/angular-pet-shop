import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserProfile} from '../../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private readonly baseUrl = 'http://localhost:8080';
  private userProfileSignal = signal<UserProfile | null>(null)

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userProfileSignal.set(JSON.parse(storedUser));
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/user/login`, credentials, { headers });
  }

  saveSession(user: UserProfile) {
    this.userProfileSignal.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserProfile(): UserProfile | null {
    return this.userProfileSignal()
  }

  logout() {
    this.userProfileSignal.set(null)
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/']);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, user);
  }


  // updateUser(user: Partial<UserProfile>, username: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({'Content-Type': 'application/json',
  //     Authorization: `Basic ${btoa(`${username}:${password}`)}`,
  //   });
  //   return this.http.put(`${this.baseUrl}/user/update`, user, { headers });
  // }
  updateUser(userData: any, username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      'Content-Type': 'application/json',
    });

    return this.http.put('http://localhost:8080/user/update', userData, {
      headers: headers,
      responseType: 'text', // Specify the response type as 'text'
    });
  }


}
