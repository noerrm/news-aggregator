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
  private dates: string[] = [];
  data: number[] = [];
  loadingAnimation: boolean;
  clicked = false;
  faCog = faCog;
  faUndo = faUndo;

  onClick() {
    this.loadingAnimation = true;
    // // Request total results of the keyword for each day of the last week from api.
    // for (const date in this.dates) {
    //   this.newsDataService.searchApiKeyword(this.session.keyword, this.dates[date]);
    //   this.newsDataService.getNews().subscribe(
    //     data => {
    //       // Save each date of a day and its value in session storage.
    //       this.resultOfTheDay = data['totalResults'];
    //       this.loadingAnimation = false;
    //       sessionStorage.setItem(this.dates[date], JSON.stringify(this.resultOfTheDay));
    //       // Show chart when data is available.
    //     }
    //   );
    // }
    // Clear data array before filling.
    // this.data.length = 0;
    this.fillDataArray();
    this.drawC3BarChart();
  }
  // setTimeout( () => {}, 5000);
  fillDataArray() {
        for (let i = 0; i < this.dates.length; i++) {
          const result = sessionStorage.getItem(this.dates[i]);
          this.data.push(Number(result));
        }
        console.log(this.data);
  }
  // fillDataArray = async () => {
  //   for (let i = 0; i < this.dates.length; i++) {
  //     const result = await this.getItemfromSessionStorage(this.dates[i])
  //       .then(() => console.log(result));
  //   }
  // };
  // // this.data.push(Number(result)))
  // getItemfromSessionStorage = async (item) => {
  //   await null;
  //   return sessionStorage.getItem(item);
  // };
  drawC3BarChart() {
    setTimeout( () => {
      this.loadingAnimation = false;
      c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['Keyword occured', ...this.data]
          ],
          type: 'bar',
          labels: true,
          colors: {
            'Keyword occured': '#F0A202'
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
            categories: this.dates
          }
        },
        tooltip: {
          show: false
        },
        padding: {
          bottom: 25
        }
      });
    }, 5000);
  }
  onResize() {
    this.drawC3BarChart();
  }
  ngOnInit() {
    this.dates = this.newsDataService.getDatesOfLastWeek();
    this.session = sessionStorage;
  }
}
