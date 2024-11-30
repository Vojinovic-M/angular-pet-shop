import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable} from 'rxjs';
import { PetModel } from '../models/pet.model';
import { PageModel } from '../models/page.model';
import {RasaModel} from "../models/rasa.model";

@Injectable({
  providedIn: 'root',
})

export class WebService {
  private readonly baseUrl = 'http://localhost:8080/api/pets'; // Update this URL as needed
  private readonly petsJsonUrl = 'assets/pets.json';

  constructor(private http: HttpClient) {}

  // Fetch recommended pets (e.g., featured or most popular)
  public getRecommendedPets(): Observable<PageModel<PetModel>> {
    return this.http.get<PageModel<PetModel>> (`${this.baseUrl}/recommended`)
      .pipe(catchError(() => {
        console.log('Backend API failed, loading from local pets.json');
        return this.http.get<PageModel<PetModel>>(this.petsJsonUrl);
        })
      );
  }


  getPets(page: number): Observable<PageModel<PetModel>> {
    return this.http.get<PageModel<PetModel>>('/assets/pets.json');
  }
  // Fetch a paginated list of pets
  // public getPets(page: number = 0): Observable<PageModel<PetModel>> {
  //   return this.http.get<PageModel<PetModel>> (`${this.baseUrl}?page=${page}`)
  //     .pipe(catchError(() => {
  //       console.log('Backend API failed, loading from local pets.json');
  //       return this.http.get<PageModel<PetModel>>(this.petsJsonUrl);
  //     }));
  // }

  // Fetch details of a single pet by ID
  public getPetById(id: number): Observable<PetModel> {
    return this.http.get<PetModel> (`${this.baseUrl}/${id}`)
      .pipe(catchError(() => {
        console.log('Backend API failed, loading from local pets.json');
        return this.http.get<PetModel>(this.petsJsonUrl);
      }));
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
