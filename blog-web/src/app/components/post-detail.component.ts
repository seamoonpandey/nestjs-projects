import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="container" *ngIf="post">
      <h2>{{ post.title }}</h2>
      <p class="meta">by {{ post.author || 'unknown' }} • {{ post.createdAt | date }}</p>
      <article [innerHTML]="post.content"></article>
      <div class="actions">
        <button (click)="onEdit()">edit</button>
        <button (click)="onDelete()">delete</button>
      </div>
    </section>
    <p *ngIf="!post">loading...</p>
  `
})
export class PostDetailComponent implements OnInit {
  post?: Post;
  id?: string;
  constructor(private route: ActivatedRoute, private svc: PostService, private router: Router) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.svc.get(this.id).subscribe({ next: (p) => (this.post = p), error: () => (this.post = undefined) });
    }
  }
  onEdit() {
    if (this.id) this.router.navigate(['/posts', this.id, 'edit']);
  }
  onDelete() {
    if (!this.id) return;
    this.svc.delete(this.id).subscribe({ next: () => this.router.navigate(['/']), error: () => alert('failed to delete') });
  }
}
