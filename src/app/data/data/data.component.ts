import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../../tiles/tile-data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  constructor(private newsDataService: TileDataService) {}

  private resultOfTheDay: object;
  private session;
  private dates: string[] = [];

  onClick() {
    for (const date in this.dates) {
      this.newsDataService.searchApiKeyword(this.session.keyword, this.dates[date]);
      this.newsDataService.getNews().subscribe(
        data => {
          // Save each date of a day and its value in session storage.
          this.resultOfTheDay = data['totalResults'];
          sessionStorage.setItem(this.dates[date], JSON.stringify(this.resultOfTheDay));
        }
      );
    }
  }
  ngOnInit() {
    this.dates = this.newsDataService.getDatesOfLastWeek();
    this.session = sessionStorage;
  }
}
