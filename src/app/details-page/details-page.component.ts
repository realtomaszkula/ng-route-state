import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details-page',
  template: `
    <h1>State in details component</h1>
    <pre>{{ state$ | async | json }}</pre>
  `
})
export class DetailsPageComponent implements OnInit {
  state$: Observable<any>;

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
  }
}
