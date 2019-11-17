import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TileDataService {

  url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'apiKey=d8ad46b675d64f0fa48d926952288a17';

  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.get(this.url);
  }

}
