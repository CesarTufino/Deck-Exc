import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardComponent } from './components/card/card.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardComponent,
    LayoutPageComponent,
    CardPageComponent,
    ListPageComponent,
    NewPageComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CardsModule { }
