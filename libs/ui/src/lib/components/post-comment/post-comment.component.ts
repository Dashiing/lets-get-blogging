import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { PostComment } from '@lgc/data';

@Component({
  selector: 'lgc-post-comment',
  templateUrl: './post-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentComponent {
  @HostBinding('class') class = 'post-comment';
  @Input() comment?: PostComment;
}
