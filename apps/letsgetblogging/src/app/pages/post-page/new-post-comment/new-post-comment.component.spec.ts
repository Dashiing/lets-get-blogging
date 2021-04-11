import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { NewPostCommentComponent } from './new-post-comment.component';

describe('NewPostCommentComponent', () => {
  let component: NewPostCommentComponent;
  let fixture: ComponentFixture<NewPostCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPostCommentComponent],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not emit to create a new comment if all form inputs are not filled', () => {
    spyOn(component.create, 'emit');

    const hostElement = fixture.nativeElement;

    const contentInput: HTMLInputElement = hostElement.querySelector('.new-post-comment-content');
    contentInput.value = '';
    const userInput: HTMLInputElement = hostElement.querySelector('.new-post-comment-content');
    userInput.value = '';

    const form = hostElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.create.emit).not.toHaveBeenCalled();
  });

  it('should not emit to create a new comment if only user input is filled', () => {
    spyOn(component.create, 'emit');

    const hostElement = fixture.nativeElement;

    const contentInput: HTMLInputElement = hostElement.querySelector('.new-post-comment-content');
    contentInput.value = '';
    const userInput: HTMLInputElement = hostElement.querySelector('.new-post-comment-content');
    userInput.value = 'User';

    const form = hostElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.create.emit).not.toHaveBeenCalled();
  });

  it('should emit to create a new comment if all form inputs are filled', () => {
    spyOn(component.create, 'emit');

    const hostElement = fixture.nativeElement;

    const contentInput: HTMLTextAreaElement = hostElement.querySelector('.new-post-comment-content');
    contentInput.value = 'Comment content';
    contentInput.dispatchEvent(new Event('input'));
    const userInput: HTMLInputElement = hostElement.querySelector('.new-post-comment-user');
    userInput.value = 'User';
    userInput.dispatchEvent(new Event('input'));

    const form = hostElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.create.emit).toHaveBeenCalled();
  });
});
