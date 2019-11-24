import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById('dataModule').innerHTML = 'Routing to data module works.';
  }

}
