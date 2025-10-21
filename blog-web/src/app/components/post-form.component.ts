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
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>title<input formControlName="title" /></label>
        <label>content<textarea formControlName="content"></textarea></label>
        <label>author<input formControlName="author" /></label>
        <button type="submit" [disabled]="form.invalid">save</button>
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
  constructor(private route: ActivatedRoute, private svc: PostService, private router: Router) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;
    if (this.isEdit && this.id) {
      this.svc.get(this.id).subscribe({ next: (p) => this.form.patchValue(p) });
    }
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
      this.svc.create(payload).subscribe({ next: (p) => this.router.navigate(['/posts', p.id]) });
    }
  }
}
