import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <section class="container">
      <h2>{{ isEdit ? 'edit post' : 'new post' }}</h2>
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <label>
          <div class="small-note">Title</div>
          <input formControlName="title" placeholder="A concise, descriptive title" />
          <div *ngIf="form.controls.title.invalid && form.controls.title.touched" class="error">Title is required</div>
        </label>

        <label>
          <div class="small-note">Content</div>
          <textarea formControlName="content" placeholder="Write your post content..."></textarea>
          <div *ngIf="form.controls.content.invalid && form.controls.content.touched" class="error">Content is required</div>
        </label>

        <label>
          <div class="small-note">Author</div>
          <input formControlName="author" placeholder="Your name (optional)" />
        </label>

        <div class="actions">
          <button type="button" class="btn secondary" (click)="cancel()">cancel</button>
          <button type="submit" class="btn" [disabled]="form.invalid || saving">{{ saving ? 'saving…' : (isEdit ? 'update' : 'save') }}</button>
        </div>
      </form>
    </section>
  `
})
export class PostFormComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    content: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    author: new FormControl('', { nonNullable: false })
  });
  isEdit = false;
  id?: string;
  public saving = false;
  constructor(private route: ActivatedRoute, private svc: PostService, private router: Router) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;
    if (this.isEdit && this.id) {
      this.svc.get(this.id).subscribe({ next: (p) => this.form.patchValue(p) });
    }
  }
  cancel() {
    this.router.navigate(['/']);
  }
  submit() {
    if (this.form.invalid) return;
    const raw = this.form.value;
    // normalize null author to undefined to match Post interface
    const payload: Partial<import('../models/post.model').Post> = {
      title: raw.title,
      content: raw.content,
      author: raw.author ?? undefined
    };
    if (this.isEdit && this.id) {
      this.svc.update(this.id, payload).subscribe({ next: () => this.router.navigate(['/posts', this.id]) });
    } else {
      this.saving = true;
      this.svc.create(payload).subscribe({
        next: (p) => {
          this.saving = false;
          // backend may return `id` or `_id`; be defensive
          const returnedId = (p as any)?.id ?? (p as any)?._id;
          if (!returnedId) {
            console.error('create returned no id', p);
            this.router.navigate(['/']);
            return;
          }
          this.router.navigate(['/posts', returnedId]);
        },
        error: (err) => {
          this.saving = false;
          console.error('create failed', err);
          alert('failed to save post; see console for details');
        }
      });
    }
  }
}
