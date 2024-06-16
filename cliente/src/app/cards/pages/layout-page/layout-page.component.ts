import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CardInterface } from '../../../interfaces/card.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit {

  public cards: CardInterface[] = [];
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-card' },
    { label: 'Mis Tarjetas', icon: 'style', url: './my-list' },
  ]

  constructor(
    private cardSrv: CardsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cardSrv.getCards()
      .subscribe(card => {
        this.cards = card;
        console.log('cards: ', this.cards);
      },
        error => {
          console.log('Error al obtener las tarjetas:', error);
        })
  }

  onLogout(){
    this.cardSrv.logout();
    this.router.navigate(['/auth/login']);
  }
}
