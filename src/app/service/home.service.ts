import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CommentResponse,
  Content,
  PostResponse,
} from '../modals/post-response';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:8080/api/posts';

  createPost(value: any, file: File): Observable<any> {
    let postData = {
      title: value.title,
      description: value.description,
      categoryId: value.categoryId,
    };

    let formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(postData));
    console.log(file);
    console.log(JSON.stringify(postData));
    return this.http.post<any>(this.url + '/v2', formData);

    // return this.http.post<any>(this.url, value);
  }

  getAllPost(): Observable<Content> {
    return this.http.get<Content>(this.url);
  }

  getPostByPageNumber(pageNo: Number): Observable<Content> {
    return this.http.get<Content>(`${this.url}?pageNo=${pageNo}`);
  }

  getPostById(postId: Number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.url}/${postId}`);
  }

  // get all post of my blog
  myblogPost(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${this.url}/myblog`);
  }

  deletePost(id: Number): Observable<String> {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text',
    });
  }

  createComment(
    postId: Number,
    comment: { body: string }
  ): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      `${this.url}/${postId}/comments`,
      comment
    );
  }
}
