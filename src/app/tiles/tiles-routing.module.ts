import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';


const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'article', component: ArticleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TilesRoutingModule { }
