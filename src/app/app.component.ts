import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/" [state]="{ hello: 'root' }">Root</a>
      <a (click)="go()">Details</a>
    </nav>

    <h1>State in root component</h1>
    <pre>{{ state$ | async | json }}</pre>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  state$: Observable<object>;

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.state$ = this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => {
        const currentNav = this.router.getCurrentNavigation();
        return currentNav.extras.state;
      })
    );
  }

  go() {
    this.router.navigateByUrl('/details', { state: { hello: 'details' } });
  }
}
