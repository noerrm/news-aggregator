import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../../tiles/tile-data.service';
import * as d3 from 'd3';

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
  data = [100, 125, 300, 440, 500];

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
      d3.select('#chart')
         .attr('width', this.chartWidth)
         .attr('height', this.chartHeight)
         .style('background', '#f4f4f4')
         .selectAll('rect')
         .data(this.data)
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
