export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  likes: number;
  commentsCount: number;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  postId: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface PostContextType {
  posts: Post[];
  featuredPosts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: string) => Promise<Post | null>;
  createPost: (post: Omit<Post, 'id' | 'authorId' | 'author' | 'createdAt' | 'updatedAt' | 'likes' | 'commentsCount'>) => Promise<Post>;
  updatePost: (id: string, post: Partial<Post>) => Promise<Post>;
  deletePost: (id: string) => Promise<boolean>;
  likePost: (id: string) => Promise<void>;
}