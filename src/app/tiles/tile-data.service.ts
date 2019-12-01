import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TileDataService {
  dates: string[] = [];
  private url = 'https://newsapi.org/v2/everything?' +
            'q=()&' +
            'apiKey=d8ad46b675d64f0fa48d926952288a17';

  constructor(private http: HttpClient) {}
  getDatesOfLastWeek(): string[] {
    // Get dates of the last week starting from today.
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      this.dates.push(dateString);
    }
    return this.dates;
  }
  searchApiKeyword(input: string, date: string): string {
    // Replace all characters between q= and & with new input value
    this.url = this.url.replace(/q=.*&/, `q=(${input})&pageSize=100&from=${date}&to=${date}&`);
    return this.url;
  }
  getNews(): Observable<any> {
    return this.http.get(this.url);
  }
}
