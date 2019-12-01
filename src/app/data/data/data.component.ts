import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../../tiles/tile-data.service';
import { select, scaleLinear, max, range } from 'd3';
import {sample} from 'rxjs/operators';

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
  barWidth = 40;
  barOffset = 8;
  dataResults = [263, 433, 889, 917, 632, 584, 635];
  dataDates = ['2019-12-01', '2019-11-30', '2019-11-29', '2019-11-28', '2019-11-27', '2019-11-26', '2019-11-25'];
  // Chart will always display bars even though values are higher than chart height.
  yScale = scaleLinear().domain([0, max(this.dataResults)]).range([0, this.chartHeight]);
  xScale = scaleLinear().domain([0, max(this.dataResults)]).range([0, this.chartWidth]);

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
      select('#chart').classed('svg-container', true)
         .append('svg')
         .attr('viewBox', '0 0 600 400')
         .classed('svg-responsive', true)
         .attr('width', this.chartWidth)
         .attr('height', this.chartHeight)
         .style('background', '#f4f4f4')
         .selectAll('rect')
         .data(this.dataResults)
         .enter().append('rect')
            .style('fill', '#F0A202') // Color of the bars.
            .attr('width', this.barWidth) // Width of the bars.
            .attr('height', (d) => { // Set height of bars to value of data.
              return this.yScale(d); // Scale height of bars with values in the data array.
            })
            .attr('x', (d, i) => {
              return i * (this.barWidth + this.barOffset);
            })
            .attr('y', (d) => {
              return this.chartHeight - this.yScale(d);
            });
  }
  ngOnInit() {
    this.dates = this.newsDataService.getDatesOfLastWeek();
    this.session = sessionStorage;
    this.drawBarChart();
  }
}
