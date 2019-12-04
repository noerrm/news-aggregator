import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../article';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  state: Observable<object>;
  private article: Article;
  faUndo = faUndo;
  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.state = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    // Convert observable to type article.
    this.state.subscribe(data => this.article = data['state']);
  }

}
