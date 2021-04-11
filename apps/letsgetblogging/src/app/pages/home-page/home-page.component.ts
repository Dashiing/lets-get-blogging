import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '@lgc/data';
import { HomePageService } from './home-page.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'lgb-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  posts$: Observable<Post[]>;

  getPostsError: string;

  constructor(homePageService: HomePageService) {
    this.posts$ = homePageService.getPosts()
      .pipe(catchError((errorMsg: string) => {
        this.getPostsError = errorMsg;
        return of([]);
      }));
  }
}
