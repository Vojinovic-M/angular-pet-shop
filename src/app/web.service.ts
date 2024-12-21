import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RasaModel } from '../models/rasa.model';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private static instance: WebService
  private client: HttpClient

  private constructor() {
    this.client = inject(HttpClient)
  }

  public static getInstance() {
    if (this.instance == undefined)
      this.instance = new WebService()
    return this.instance
  }

  public sendRasaMessage(value: string) {
    const url = 'http://localhost:5005/webhooks/rest/webhook'
    return this.client.post<RasaModel[]>(url,
      {
        sender: 'pet-shop',
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
