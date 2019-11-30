import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TilesRoutingModule } from './tiles-routing.module';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewsComponent, ArticleComponent],
  exports: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    TilesRoutingModule,
    FormsModule
  ]
})
export class TilesModule { }
