import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list.component';
import { PostDetailComponent } from './components/post-detail.component';
import { PostFormComponent } from './components/post-form.component';

export const routes: Routes = [
	{ path: '', component: PostListComponent },
	{ path: 'posts/new', component: PostFormComponent },
	{ path: 'posts/:id', component: PostDetailComponent },
	{ path: 'posts/:id/edit', component: PostFormComponent },
	{ path: '**', redirectTo: '' }
];
