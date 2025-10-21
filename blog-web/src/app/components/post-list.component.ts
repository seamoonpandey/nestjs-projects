import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="container">
      <h2>posts</h2>
      <p *ngIf="!posts?.length">no posts yet</p>
      <ul>
        <li *ngFor="let p of posts">
          <a [routerLink]="['/posts', p.id]">{{ p.title }}</a>
          <a [routerLink]="['/posts', p.id, 'edit']" class="edit">edit</a>
        </li>
      </ul>
      <a routerLink="/posts/new" class="create">create new post</a>
    </section>
  `,
  styles: [
    `
    .container { max-width:900px; margin:1rem auto; padding:1rem; }
    ul { list-style:none; padding:0; }
    li { padding:0.5rem 0; display:flex; gap:1rem; }
    .edit { color:#64748b; font-size:0.9rem; }
    .create { display:inline-block; margin-top:1rem; }
    `
  ]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private svc: PostService) {}
  ngOnInit(): void {
    this.svc.list().subscribe({ next: (data) => (this.posts = data), error: () => (this.posts = []) });
  }
}
