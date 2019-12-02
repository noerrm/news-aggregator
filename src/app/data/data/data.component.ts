import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../../tiles/tile-data.service';
import { select, scaleLinear, max } from 'd3';

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
  data: number[] = [];

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
  fillDataArray() {
    console.log(this.dates);
    for (let i = 0; i < this.dates.length; i++) {
      console.log();
      const result = sessionStorage.getItem(this.dates[i]);
      this.data.push(Number(result));
    }
    console.log(this.data);
  }
  drawBarChart() {
    // Chart will always display bars even though values are higher than chart height.
    const yScale = scaleLinear().domain([0, max(this.data)]).range([0, this.chartHeight]);
    const xScale = scaleLinear().domain([0, max(this.data)]).range([0, this.chartWidth]);
    // Append a svg element to a div.
    select('#chart').classed('svg-container', true)
         .append('svg')
         .attr('viewBox', '0 0 600 400')
         .classed('svg-responsive', true)
         .attr('width', this.chartWidth)
         .attr('height', this.chartHeight)
         .style('background', '#f4f4f4')
         .append('g')
         .selectAll('rect')
         .data(this.data)
         .enter().append('rect')
            .style('fill', '#F0A202') // Color of the bars.
            .attr('width', this.barWidth) // Width of the bars.
            .attr('height', (d) => { // Set height of bars to value of data.
              return yScale(d); // Scale height of bars with values in the data array.
            })
            .attr('x', (d, i) => {
              return i * (this.barWidth + this.barOffset);
            })
            .attr('y', (d) => {
              return this.chartHeight - yScale(d);
            });
  }
  ngOnInit() {
    this.dates = this.newsDataService.getDatesOfLastWeek();
    this.session = sessionStorage;
    this.fillDataArray();
    this.drawBarChart();
  }
}
