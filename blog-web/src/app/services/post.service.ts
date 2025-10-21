import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { BLOG_API_BASE } from '../tokens';

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private base = inject(BLOG_API_BASE);

  list(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.base}/posts`);
  }

  get(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.base}/posts/${id}`);
  }

  create(payload: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.base}/posts`, payload);
  }

  update(id: string, payload: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.base}/posts/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/posts/${id}`);
  }
}
