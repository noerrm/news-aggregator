import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TilesRoutingModule } from './tiles-routing.module';
import { NewsComponent } from './news/news.component';


@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    TilesRoutingModule
  ]
})
export class TilesModule { }
