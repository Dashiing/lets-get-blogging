import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewPostComment } from '../new-post-comment';

@Component({
  selector: 'lgb-new-post-comment',
  templateUrl: './new-post-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPostCommentComponent {
  @Output() create = new EventEmitter<NewPostComment>();

  newCommentForm = this.fb.group({
    user: ['', Validators.required],
    content: ['', Validators.required]
  });

  get userControl() {
    return this.newCommentForm.get('user');
  }

  get contentControl() {
    return this.newCommentForm.get('content');
  }
  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.newCommentForm.invalid) {
      this.userControl.markAsTouched();
      this.contentControl.markAsTouched();
    } else {
      this.create.emit({
        content: this.contentControl.value,
        user: this.userControl.value
      });
    }
  }

  reset() {
    this.contentControl.reset();
    this.userControl.reset();
  }
}
