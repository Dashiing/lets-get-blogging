import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostComment, Post } from '@lgc/data';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NewPostComment } from './new-post-comment';
import { NewPostCommentComponent } from './new-post-comment/new-post-comment.component';
import { PostPageService } from './post-page.service';

@Component({
  selector: 'lgb-post-page',
  templateUrl: './post-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPageComponent {
  @HostBinding('class') class = 'post-page';
  @ViewChild(NewPostCommentComponent) newCommentComp: NewPostCommentComponent;

  post$: Observable<Post>;
  comments: PostComment[] = [];
  postId: number;
  getPostError: string;
  getCommentsError: string;
  createCommentError: string;

  constructor(
    route: ActivatedRoute,
    private postPageService: PostPageService,
    private cdr: ChangeDetectorRef
  ) {
    const slug = route.snapshot.paramMap.get('slug');

    this.post$ = postPageService.getPost(slug)
      .pipe(
        catchError((errorMsg: string) => {
          this.getPostError = errorMsg;
          this.cdr.markForCheck();
          return of(undefined);
        }),
        tap(post => {
          if (!post) {
            return;
          }
          this.getCommentsError = '';
          this.postPageService.getPostComments(post.id)
            .pipe(catchError((errorMsg: string) => {
              this.getCommentsError = errorMsg;
              this.cdr.markForCheck();
              return of([]);
            }))
            .subscribe(comments => {
              this.comments = comments;
              this.cdr.markForCheck();
            });
          this.postId = post.id;
        }));
  }

  createNewPostComment(comment: NewPostComment) {
    this.createCommentError = '';
    this.postPageService.createPostComment(this.postId, comment)
      .pipe(catchError((errorMsg: string) => {
        this.createCommentError = errorMsg;
        this.cdr.markForCheck();
        return of(undefined);
      }))
      .subscribe((createdPostComment: PostComment | null) => {
        if (createdPostComment) {
          this.comments.unshift(createdPostComment);
          this.newCommentComp.reset();
          this.cdr.markForCheck();
        }
      });
  }

  trackById(_: number, comment: PostComment) {
    return comment.id;
  }
}
