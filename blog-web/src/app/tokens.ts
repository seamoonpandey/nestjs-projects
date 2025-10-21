import { InjectionToken } from '@angular/core';

/** Base URL for the blog API. Override at runtime if needed. */
export const BLOG_API_BASE = new InjectionToken<string>('blogApiBase');
