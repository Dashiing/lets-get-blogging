import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Post } from '@lgc/data';
import { BlogService } from '@lgc/ui';
import { of } from 'rxjs';

import { HomePageComponent } from './home-page.component';

const post9 = {
  id: 9,
  title: 'Blog post #9',
  author: 'Myron Montford',
  publish_date: '2016-10-11',
  slug: 'blog-post-9',
  description: 'Ius ad verear tincidunt scriptorem, vel et libris saperet invidunt.',
  // eslint-disable-next-line max-len
  content: '<p>Ius ad verear tincidunt scriptorem, vel et libris saperet invidunt. No assum maiorum per. Purto tamquam labores has ex. Eu aliquid interpretaris vel, eos tale rebum dolore in.</p>'
};

const post10 = {
  id: 10,
  title: 'Blog post #10',
  author: 'Tandy Thiem',
  publish_date: '2016-11-29',
  slug: 'blog-post-10',
  description: 'Natum integre tractatos eu duo, ut falli scriptorem qui.',
  // eslint-disable-next-line max-len
  content: '<p>Natum integre tractatos eu duo, ut falli scriptorem qui. Probo inermis ad nec, petentium inciderint mei in.</p> <p>Quidam inermis detraxit per ea. Vix etiam eirmod ut, sea dolor appellantur te. Te quis dicit delicata eum, in has convenire interesset.</p>'
};

const posts: Post[] = [post9, post10];

class MockBlogService {
  getPosts = () => of(posts);
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lgc-post-card',
  template: ''
})
class MockPostCardComponent {
  @Input() post: Post;
}

describe('HomeComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, MockPostCardComponent],
      providers: [
        { provide: BlogService, useClass: MockBlogService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get post list sorted by publish date from newest first', () => {
    let posts: Post[];
    component.posts$.subscribe(p => posts = p);
    expect(posts).toStrictEqual([post10, post9]);
  });
});
