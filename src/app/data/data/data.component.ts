import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../../tiles/tile-data.service';
import { select,  } from 'd3';

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
  chartWidth = 500;
  chartHeight = 500;
  barWidth = 35;
  barOffset = 5;
  dataResults = [263, 433, 889, 917, 632, 584, 635];
  dataDates = ['2019-12-01', '2019-11-30', '2019-11-29', '2019-11-28', '2019-11-27', '2019-11-26', '2019-11-25'];
  yScale;
  xScale;

  onClick() {
    // Request total results of the keyword for each day of the last week from api.
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
  drawBarChart() {
    // Append a svg element to a div.
      select('#chart').append('svg')
         .attr('width', this.chartWidth)
         .attr('height', this.chartHeight)
         .style('background', '#f4f4f4')
         .selectAll('rect')
         .data(this.dataResults)
         .enter().append('rect')
            .style('fill', '#F0A202') // Color of the bars.
            .attr('width', this.barWidth) // Width of the bars.
            .attr('height', (d) => { // Set height of bars to value of data.
              return d;
            })
            .attr('x', (d, i) => {
              return i * (this.barWidth + this.barOffset);
            })
            .attr('y', (d) => {
              return this.chartHeight - d;
            });
  }
  ngOnInit() {
    this.dates = this.newsDataService.getDatesOfLastWeek();
    this.session = sessionStorage;
    this.drawBarChart();
  }
}
