import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, pipe, tap} from 'rxjs';
import { PetModel } from '../../models/pet.model';
import { PageModel } from '../../models/page.model';
import {RasaModel} from "../../models/rasa.model";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})

export class WebService {
  private readonly baseUrl = 'http://localhost:8080/pets'; // Update this URL as needed
  private readonly petsJsonUrl = 'assets/pets.json';

  constructor(private http: HttpClient) {}

   getPetsFROMJSON(page: number): Observable<PageModel<PetModel>> {return this.http.get<PageModel<PetModel>>('/assets/pets.json');}

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

  public getPetById(id: string): Observable<PetModel | null> {
    return this.http.get<PetModel>(`${this.baseUrl}/${id}`)
      .pipe(
      catchError((error) => {
        console.error('Error loading pet data: ', error);
        return of(null);  // Return null if there's an error
      })
    );
  }

  public formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString()
  }

  private retrieveRasaSession() {
    if (localStorage.getItem('session'))
      localStorage.setItem('session', uuidv4())
    return localStorage.getItem('session')
  }
public sendRasaMessage(value: string) {
    const url = 'http://localhost:5005/webhooks/rest/webhook'
    return this.http.post<RasaModel[]>(url,
      {
        sender: 'localStorage.getItem("session")',
        refreshToken: '',
        message: value
      },
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )
  }
}
