import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../tile-data.service';
import { Subscription } from 'rxjs';
import { Article } from '../article';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  constructor(private newsDataService: TileDataService) {}
  public articles: Article[];
  private subscription: Subscription;

  onSubmit(keyword: string) {
    console.log(keyword);
    this.newsDataService.searchApiKeyword(keyword);
    this.subscription = this.newsDataService.getNews().subscribe(
       data => (this.articles = data['articles'])
     );
  }
  ngOnInit() {}
}

