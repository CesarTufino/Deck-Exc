import { Component, Input, OnInit } from '@angular/core';
import { CardInterface } from '../../../interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input()
  public card!: CardInterface;

  ngOnInit(): void {
      if(!this.card) throw Error('No llega la informacion')
  }
}
