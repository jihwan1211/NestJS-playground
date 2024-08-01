import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'me1',
    title: 'me1_title',
    content: 'me1_content',
    likeCount: 1,
    commentCount: 1,
  },
  {
    id: 2,
    author: 'me2',
    title: 'me2_title',
    content: 'me2_content',
    likeCount: 2,
    commentCount: 2,
  },
  {
    id: 3,
    author: 'me3',
    title: 'me3_title',
    content: 'me3_content',
    likeCount: 3,
    commentCount: 3,
  },
];

@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);
    if (!post) throw new NotFoundException();
    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(id: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) throw new NotFoundException();

    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;

    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));

    return post;
  }

  deletePost(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) throw new NotFoundException();
    posts = posts.filter((post) => post.id !== +id);
    return id;
  }
}
