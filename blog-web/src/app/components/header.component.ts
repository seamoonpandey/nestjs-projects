import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="app-header">
      <nav>
        <a routerLink="/" class="brand">blog</a>
        <a routerLink="/" class="link">posts</a>
        <a routerLink="/posts/new" class="link">new post</a>
      </nav>
    </header>
  `,
  styles: [
    `
    .app-header { background: #0f172a; color: white; padding: 0.75rem 1rem; }
    nav { display:flex; gap:1rem; align-items:center; max-width:900px; margin:0 auto; }
    .brand { font-weight:700; color:#fff; text-decoration:none; margin-right:auto; }
    .link { color: #cbd5e1; text-decoration:none; }
    .link:hover { color: #fff; }
    `
  ]
})
export class HeaderComponent {}
