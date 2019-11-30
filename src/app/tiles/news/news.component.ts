import { Component, OnInit, ViewChild } from '@angular/core';
import { TileDataService } from '../tile-data.service';
import { Subscription } from 'rxjs';
import { Article } from '../article';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  constructor(private newsDataService: TileDataService) {
  }

  public articles: Article[];
  private subscription: Subscription;
  // Access the form with the id inputForm.
  @ViewChild('inputForm', {static: false}) formValues;
  loadingAnimation: boolean;

  onSubmit(keyword: string) {
    console.log(keyword);
    this.loadingAnimation = true;
    this.newsDataService.searchApiKeyword(keyword);
    this.subscription = this.newsDataService.getNews().subscribe(
      data => {
        this.articles = data['articles'];
        // Hide animation when all articles are requested.
        this.loadingAnimation = false;
        sessionStorage.setItem('articles', JSON.stringify(this.articles));
      }
    );
    // Reset the form after submit.
    this.formValues.reset();
  }
  // clearInput() {
  //   const inputField = document.querySelector('inputField');
  //   inputField.nodeValue = '';
  // }
  ngOnInit() {
    // Hide loading animation on init.
    this.loadingAnimation = false;
  }
}
