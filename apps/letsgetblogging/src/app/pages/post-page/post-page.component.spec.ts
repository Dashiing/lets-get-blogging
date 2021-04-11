import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PostComment } from '@lgc/data';
import { BlogService } from '@lgc/ui';
import { of } from 'rxjs';
import { NewPostComment } from './new-post-comment';

import { PostPageComponent } from './post-page.component';
import { PostPageService } from './post-page.service';

const post = {
  id: 10,
  title: 'Blog post #10',
  author: 'Tandy Thiem',
  publish_date: '2016-11-29',
  slug: 'blog-post-10',
  description: 'Natum integre tractatos eu duo, ut falli scriptorem qui.',
  // eslint-disable-next-line max-len
  content: '<p>Natum integre tractatos eu duo, ut falli scriptorem qui. Probo inermis ad nec, petentium inciderint mei in.</p> <p>Quidam inermis detraxit per ea. Vix etiam eirmod ut, sea dolor appellantur te. Te quis dicit delicata eum, in has convenire interesset.</p>'
};

const newComment: NewPostComment = {
  content: 'A comment content',
  user: 'User1'
};

const postComment: PostComment = {
  ...newComment,
  date: '2021-03-03',
  postId: 10
};

class MockBlogService {
  getPosts = () => of([post]);
  getPost = () => of(post);
  createPostComment = () => of(postComment);
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lgb-new-post-comment',
  template: ''
})
class MockNewPostCommentComponent {}

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostPageComponent, MockNewPostCommentComponent],
      imports: [RouterTestingModule],
      providers: [
        DatePipe,
        PostPageService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => ({ slug: '' })
              }
            }
          }
        },
        { provide: BlogService, useClass: MockBlogService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const baseTime = new Date(2021, 2, 3);
    jest.useFakeTimers('modern');
    jest.setSystemTime(baseTime);

    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new comment', () => {
    component.createNewPostComment(newComment);

    expect(component.comments).toStrictEqual([postComment]);
  });
});
