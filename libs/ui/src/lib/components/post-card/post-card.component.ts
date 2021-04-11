import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from '@lgc/data';

@Component({
  selector: 'lgc-post-card',
  templateUrl: './post-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  @Input() post?: Post;
}
