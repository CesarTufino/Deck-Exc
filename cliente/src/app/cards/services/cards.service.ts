import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardInterface } from '../../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private baseUrl: string = environments.JsonServer;

  constructor( private http: HttpClient) { }

  getCards(): Observable<CardInterface[]>{
    return this.http.get<CardInterface[]>(`${this.baseUrl}/cards`);
  }
}
