export interface Post {
  /** resource id (string to match API) */
  id?: string;

  /** short title for the post */
  title: string;

  /** optional short summary */
  summary?: string;

  /** full markdown/html content */
  content: string;

  /** author name or id */
  author?: string;

  /** ISO timestamp strings */
  createdAt?: string;
  updatedAt?: string;
}
