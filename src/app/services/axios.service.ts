import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    // Configure Axios defaults for all requests
    axios.defaults.baseURL = 'http://localhost:8080'; // Base URL for API requests
    axios.defaults.headers.post['Content-Type'] = 'application/json'; // Default Content-Type for POST requests
  }

  /**
   * Makes an HTTP request using Axios.
   * @param method The HTTP method (e.g., GET, POST, PUT, DELETE).
   * @param url The endpoint URL to make the request.
   * @param data The request payload (optional).
   * @returns A promise that resolves with the server's response.
   */
  request(method: string, url: string, data: any): Promise<any> {
    return axios({
      method: method, // HTTP method
      url: url, // Full endpoint
      data: data, // Request payload for methods like POST or PUT
    });
  }
}
