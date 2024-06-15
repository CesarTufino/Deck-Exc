import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { CardInterface } from '../../interfaces/card.interface';
import { OffersInterface } from '../../interfaces/oferta.interface';
import { error } from 'console';

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

  getMyOffers(): Observable<OffersInterface[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.get<OffersInterface[]>(`${this.baseUrl}/offers/user`, { headers });
  }

  getOfferById( id: string ): Observable<OffersInterface|undefined>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.get<OffersInterface>(`${this.baseUrl}/offers/${id}`, { headers })
      .pipe(
        catchError(error => of(undefined))
      )
  }

  addOffer( offer: OffersInterface): Observable<OffersInterface>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.post<OffersInterface>(`${this.baseUrl}/offers`, offer, { headers })
  }

  updateOfferById(offer: OffersInterface): Observable<OffersInterface>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.patch<OffersInterface>(`${this.baseUrl}/offers/${offer.id}`, offer, { headers })
  }

  deleteOfferById( id: string):Observable<boolean>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.delete(`${this.baseUrl}/offers/${id}`, { headers })
      .pipe(
        map(resp => true),
        catchError( err => of(false))
      )
  }
}
