import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post, PostComment } from '@lgc/data';

import { API_URL } from '../../tokens';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`)
      .pipe(catchError(() => throwError('Failed to get posts; please try again later.')));
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${postId}`)
      .pipe(catchError(() => throwError('Failed to get post details; please try again later.')));

  }

  getPostComments(postId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.apiUrl}/posts/${postId}/comments`)
      .pipe(catchError(() => throwError('Failed to get comments; please try again later.')));

  }

  createPostComment(comment: PostComment) {
    return this.http.post<PostComment>(`${this.apiUrl}/posts/${comment.postId}/comments`, comment)
      .pipe(catchError(() => throwError('Failed to create a comment; please try again.')));
  }

  updateComment(commentId: number, comment: PostComment) {
    return this.http.put(`${this.apiUrl}/comments/${commentId}`, comment)
      .pipe(catchError(() => throwError('Failed to update a comment; please try again.')));
  }
}
