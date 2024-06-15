import { Component, OnInit } from '@angular/core';
import { CardInterface } from '../../../interfaces/card.interface';
import { CardsService } from '../../services/cards.service';
import { OffersInterface } from '../../../interfaces/oferta.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {

  public offers: OffersInterface[] = [];
  // public cards: CardInterface[] = [];

  constructor(private cardSrv: CardsService) { }

  ngOnInit(): void {
  //   this.cardSrv.getCards()
  //   .subscribe( card => {
  //     this.cards = card;
  //     console.log('cards: ', this.cards);
  //   },
  // error => {
  //   console.log('Error al obtener las tarjetas:', error);
  // })

    this.cardSrv.getOffers()
    .subscribe(offer => {
      this.offers = offer
      console.log(this.offers);
    },
    error => {
      console.log(error);
    })
  }
}
