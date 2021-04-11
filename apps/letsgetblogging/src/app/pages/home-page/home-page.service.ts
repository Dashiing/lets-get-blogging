import { Injectable } from '@angular/core';
import { Post } from '@lgc/data';
import { BlogService } from '@lgc/ui';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private blogService: BlogService) {}

  getPosts(): Observable<Post[]> {
    return this.blogService.getPosts().pipe(
      map(posts => posts.sort((a: Post, b: Post) =>
        new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
      ))
    );
  }
}
