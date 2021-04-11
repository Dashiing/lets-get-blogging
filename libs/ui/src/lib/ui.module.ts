import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './components/post-card/post-card.component';
import { RouterModule } from '@angular/router';
import { HowLongPipe } from './core/pipes/how-long/how-long.pipe';
import { PostCommentComponent } from './components/post-comment/post-comment.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PostCardComponent, HowLongPipe, PostCommentComponent],
  exports: [PostCardComponent, HowLongPipe, PostCommentComponent]
})
export class UiModule {}
