import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../../tiles/tile-data.service';
import { faCog, faUndo } from '@fortawesome/free-solid-svg-icons';
import * as c3 from 'c3';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  constructor(private newsDataService: TileDataService) {}

  private resultOfTheDay: object;
  private session;
  data: number[] = [];
  loadingAnimation: boolean;
  clicked = false;
  faCog = faCog;
  faUndo = faUndo;

  onClick() {
    this.loadingAnimation = true;
   // Request total results of the keyword for each day of the last week from api.
    for (const date in this.newsDataService.getDates()) {
      this.newsDataService.searchApiKeyword(this.session.keyword, this.newsDataService.getDates()[date]);
      this.newsDataService.getNews().subscribe(
        data => {
          // Save each date of a day and its value in session storage.
          this.resultOfTheDay = data['totalResults'];
          this.data.push(Number(JSON.stringify(this.resultOfTheDay)));
          // Show chart when data is available.
        }
      );
    }
    this.drawBarChart();
  }
  drawBarChart() {
    this.loadingAnimation = false;
    setTimeout( () => {
      c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['Keyword mentioned in the news', ...this.data]
          ],
          type: 'bar',
          labels: true,
          colors: {
            'Keyword mentioned in the news': '#F0A202'
          }
        },
        bar: {
          width: {
            ratio: 0.5
          }
        },
        axis: {
          x: {
            type: 'category',
            categories: this.newsDataService.getDates()
          }
        },
        tooltip: {
          show: false
        },
        padding: {
          bottom: 25
        }
      });
    }, 2000);
  }
  onResize() {
    this.drawBarChart();
  }
  ngOnInit() {
    this.session = sessionStorage;
    this.newsDataService.calculateDatesOfLastWeek();
  }
}
