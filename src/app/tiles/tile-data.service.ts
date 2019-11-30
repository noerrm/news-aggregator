import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TileDataService {
  url = 'https://newsapi.org/v2/everything?' +
            'q=()&' +
            'apiKey=d8ad46b675d64f0fa48d926952288a17';

  constructor(private http: HttpClient) {}

  searchApiKeyword(input: string): string {
    // Replace all characters between q= and & with new input value
    this.url = this.url.replace(/q=.*&/, `q=(${input})&pageSize=100&`);
    console.log(this.url);
    return this.url;
  }
  getNews(): Observable<any> {
    return this.http.get(this.url);
  }

}
