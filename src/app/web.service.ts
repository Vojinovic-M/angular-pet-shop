import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetModel } from '../models/pet.model';
import { PageModel } from '../models/page.model';
import {RasaModel} from "../models/rasa.model";

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private static instance: WebService;

  private readonly baseUrl = 'http://localhost:8080/api/pets'; // Update this URL as needed

  constructor(private http: HttpClient) {
    // if (!WebService.instance) {
    //   WebService.instance = this;
    // }
    // return WebService.instance;
  }

  // Fetch recommended pets (e.g., featured or most popular)
  public getRecommendedPets(): Observable<PageModel<PetModel>> {
    return this.http.get<PageModel<PetModel>>(`${this.baseUrl}/recommended`);
  }

  // Fetch a paginated list of pets
  public getPets(page: number = 0): Observable<PageModel<PetModel>> {
    return this.http.get<PageModel<PetModel>>(`${this.baseUrl}?page=${page}`);
  }

  // Fetch details of a single pet by ID
  public getPetById(id: string): Observable<PetModel> {
    return this.http.get<PetModel>(`${this.baseUrl}/${id}`);
  }

  // Optional utility method: Format dates
  public formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }

  // Optional utility method: Handle missing or null values
  public formatValue(value: string | null | undefined): string {
    return value ? value : 'N/A';
  }

public sendRasaMessage(value: string) {
    const url = 'http://localhost:5005/webhooks/rest/webhook'
    return this.http.post<RasaModel[]>(url,
      {
        sender: 'ICRNASTAVA',
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
