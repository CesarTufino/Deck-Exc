import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardInterface } from '../../interfaces/card.interface';
import { OffersInterface } from '../../interfaces/oferta.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private baseUrl: string = environments.deckBack;

  constructor( private http: HttpClient) { }

  getCards(): Observable<CardInterface[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.get<CardInterface[]>(`${this.baseUrl}/cards`, { headers });
  }

  getOffers(): Observable<OffersInterface[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.get<OffersInterface[]>(`${this.baseUrl}/offers`, { headers });
  }
}
