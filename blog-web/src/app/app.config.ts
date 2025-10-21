import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { BLOG_API_BASE } from './tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provide HttpClient and pick up interceptors from DI if added later
    provideHttpClient(withInterceptorsFromDi()),
    // default API base — replace if you need a different host during deployment
    { provide: BLOG_API_BASE, useValue: 'http://localhost:3000/api' }
  ]
};
