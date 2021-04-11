import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '@lgc/ui';
import { catchError, map } from 'rxjs/operators';

import { PostComment } from '@lgc/data';
import { DatePipe } from '@angular/common';
import { NewPostComment } from './new-post-comment';
import { throwError } from 'rxjs';
import { PostPageDependenciesModule } from './post-page-dependencies.module';

@Injectable({
  providedIn: PostPageDependenciesModule
})
export class PostPageService {

  constructor(
    private router: Router,
    private blogService: BlogService,
    private datePipe: DatePipe
  ) {}

  getPost(slug: string) {
    const postId: number = this.router.getCurrentNavigation()?.extras.state?.id;

    return postId
      // if navigated to, get post with id from history api state
      ? this.blogService.getPost(postId)
      // if page url or browser refresh use slug to get post id
      : this.blogService.getPosts()
        .pipe(
          catchError(() => throwError('Failed to get post details; please try again later.')),
          map(posts =>
            posts.find(post => post.slug === slug)
          ));
  }

  getPostComments(postId: number) {
    return this.blogService.getPostComments(postId).pipe(
      map(comments => comments.sort((a: PostComment, b: PostComment) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ))
    );
  }

  createPostComment(postId: number, newComment: NewPostComment) {
    const comment: PostComment = {
      ...newComment,
      postId,
      date: this.datePipe.transform(new Date(), 'YYYY-MM-dd')
    }

    return this.blogService.createPostComment(comment);
  }
}
