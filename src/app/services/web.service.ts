import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of, pipe, tap} from 'rxjs';
import { PetModel } from '../../models/pet.model';
import { PageModel } from '../../models/page.model';
import {RasaModel} from "../../models/rasa.model";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})

export class WebService {
  private readonly baseUrl = 'http://localhost:8080/pets';

  constructor(private http: HttpClient) {}

  /**
   * Fetch paginated list of pets from the backend.
   * @param page - The page number to retrieve.
   * @returns An observable containing a page model with the pet data.
   */
  getPets(page: number): Observable<PageModel<PetModel>> {
    return this.http.get<PageModel<PetModel>>(`${this.baseUrl}/list?page=${page}`).pipe(
      catchError((error) => {
        console.error('Error fetching paginated pets data: ', error);
        return of({
          content: [],
          pageable: {
            sort: { sorted: false, empty: true, unsorted: true },
            pageNumber: 0,
            pageSize: 0,
            offset: 0,
            paged: true,
            unpaged: false,
          },
          totalPages: 0,
          totalElements: 0,
          last: true,
          size: 0,
          number: 0,
          sort: { sorted: false, empty: true, unsorted: true },
          numberOfElements: 0,
          first: true,
          empty: true,
        });
      })
    );
  }

  /**
   * Fetch details of a specific pet by its ID.
   * @param id - The unique ID of the pet.
   * @returns An observable containing the pet data or null if an error occurs.
   */
  public getPetById(id: string): Observable<PetModel | null> {
    return this.http.get<PetModel>(`${this.baseUrl}/${id}`)
      .pipe(
      catchError((error) => {
        console.error('Error loading pet data: ', error);
        return of(null);  // Return null if there's an error
      })
    );
  }

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
