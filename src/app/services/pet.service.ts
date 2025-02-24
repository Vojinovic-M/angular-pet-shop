import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {PageModel} from '../../models/page.model';
import {PetModel} from '../../models/pet.model';
import {PetDistanceModel} from '../../models/pet-distance.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
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

  getPetsWithDistance(userLat: number, userLng: number): Observable<PetDistanceModel[]> {
    return this.http.get<PetDistanceModel[]>(`${this.baseUrl}/with-distance?lat=${userLat}&lng=${userLng}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching pets with distance: ', error);
          return of([]);
        })
      );
  }


}
