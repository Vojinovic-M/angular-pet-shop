import { Injectable } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {catchError, Observable, of} from 'rxjs';
import {RasaModel} from '../../models/rasa.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RasaService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieve or create a unique session ID for Rasa integration.
   * @returns The Rasa session ID stored in local storage.
   */
  private retrieveRasaSession() {
    if (!localStorage.getItem('session'))
      localStorage.setItem('session', uuidv4())
    return localStorage.getItem('session')
  }

  /**
   * Send a message to the Rasa chatbot API.
   * @param value - The message to send.
   * @returns An observable containing the Rasa chatbot response.
   */
  public sendRasaMessage(value: string): Observable<RasaModel[]> {
    const url = 'http://localhost:5005/webhooks/rest/webhook'
    return this.http.post<RasaModel[]>(url, {
      sender: this.retrieveRasaSession(),
      refreshToken: '',
      message: value
    }, {
      headers: {
        'Accept': 'application/json'
      },
    }).pipe(
      catchError(error => {
        console.error('Error sending Rasa message: ', error);
        return of([]);
      })
    )
  }
}
