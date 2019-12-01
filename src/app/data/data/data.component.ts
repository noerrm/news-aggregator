import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../../tiles/tile-data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  constructor(private newsDataService: TileDataService) {}

  private resultsOfTheDay: string[];
  private dates: string[] = [];
  private keyword: string;
  // toDO: Hand keyword from newsComponent to dataComponent via routerlink.
  onClick(keyword: string) {
    // Request total results for each day.
    for (const date in this.dates) {
      // Set the url to a date.
      this.newsDataService.searchApiKeyword(keyword, this.dates[this.dates.indexOf(date)]);
      this.newsDataService.getNews().subscribe(
        data => {
          const resultOfTheDay = data['totalResults'];
          this.resultsOfTheDay.push(resultOfTheDay);
        }
      );
    }
  }
  ngOnInit() {
    this.dates = this.newsDataService.getDatesOfLastWeek();
    this.keyword = JSON.parse(sessionStorage.getItem('keyword'));
  }

}
