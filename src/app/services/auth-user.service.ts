import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserProfile} from '../../models/profile.model';
declare var Webchat: any;

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  // Base URL for all user-related API endpoints.
  private readonly baseUrl = 'http://localhost:8080';

  // Reactive signal to store the user's profile.
  private userProfileSignal = signal<UserProfile | null>(null)

  constructor(private http: HttpClient, private router: Router) {
    // Check if a user profile is stored in localStorage and set it to the signal.
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userProfileSignal.set(JSON.parse(storedUser));
    }
  }

  /**
   * Sends a login request with the provided credentials.
   * @param credentials - The user's email and password.
   * @returns An Observable containing the API response.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/user/login`, credentials, { headers });
  }

  /**
   * Saves the user's session locally and updates the signal.
   * @param user - The user's profile to save.
   */
  saveSession(user: UserProfile) {
    this.userProfileSignal.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Retrieves the current user profile stored in the signal.
   * @returns The user profile or null if not set.
   */
  getUserProfile(): UserProfile | null {
    return this.userProfileSignal()
  }

  /**
   * Logs the user out by clearing their session and redirecting to the home page.
   */
  logout() {
    this.userProfileSignal.set(null)
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/']);
  }

  /**
   * Sends a registration request for a new user.
   * @param user - The registration data.
   * @returns An Observable containing the API response.
   */
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, user);
  }

  /**
   * Sends an update request to modify the user's profile.
   * @param userData - The new profile data.
   * @param username - The username for authentication.
   * @param password - The password for authentication.
   * @returns An Observable containing the API response.
   */
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
