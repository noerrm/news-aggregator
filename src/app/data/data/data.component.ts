import { Component, OnInit } from '@angular/core';
import { TileDataService } from '../../tiles/tile-data.service';
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

  onClick() {
    // this.loadingAnimation = true;
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
    this.data.length = 0;
    console.log(this.data);
    this.fillDataArray();
    this.drawC3BarChart();
  }
  fillDataArray() {
    for (let i = 0; i < this.dates.length; i++) {
      const result = sessionStorage.getItem(this.dates[i]);
      this.data.push(Number(result));
    }
  }
  drawC3BarChart() {
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
  }
  onResize() {
    this.drawC3BarChart();
  }
  // drawBarChart() {
  //   select('svg').remove();
  //   // Chart will always display bars even though values are higher than chart height.
  //   const yScale = scaleLinear().domain([0, max(this.data)]).range([0, this.chartHeight]);
  //   const xScale = scaleLinear().domain([0, max(this.data)]).range([0, this.chartWidth]);
  //   // Append a svg element to a div.
  //   select('#chart').classed('svg-container', true)
  //        .append('svg')
  //        .attr('viewBox', '0 0 600 400')
  //        .attr('preserveAspectRatio', 'xMidYMid meet')
  //        .classed('svg-responsive', true)
  //        .attr('width', this.chartWidth)
  //        .attr('height', this.chartHeight)
  //        .style('background', '#f4f4f4')
  //        .append('g')
  //        .classed('rectangle-container', true)
  //        .style('transform', 'translate(25%, 0)')
  //        .selectAll('rect')
  //        .data(this.data)
  //        .enter().append('rect')
  //           .style('fill', '#F0A202') // Color of the bars.
  //           .attr('width', this.barWidth) // Width of the bars.
  //           .attr('height', (d) => { // Set height of bars to value of data.
  //             return yScale(d); // Scale height of bars with values in the data array.
  //           })
  //           .attr('x', (d, i) => {
  //             return i * (this.barWidth + this.barOffset);
  //           })
  //           .attr('y', (d) => {
  //             return this.chartHeight - yScale(d);
  //           });
  // }

  ngOnInit() {
    this.dates = this.newsDataService.getDatesOfLastWeek();
    this.session = sessionStorage;
  }
}
