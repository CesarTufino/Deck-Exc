import { Component, OnInit } from '@angular/core';
import { CardInterface } from '../../../interfaces/card.interface';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {

  public cards: CardInterface[] = [];

  constructor(private cardSrv: CardsService) { }

  ngOnInit(): void {
    // this.cardSrv.getCards()
    // .subscribe(card => this.cards = card );
    console.log(this.cards);
  }
}
