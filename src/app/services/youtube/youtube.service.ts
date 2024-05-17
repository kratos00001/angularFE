import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private baseUrl = 'http://localhost:3000';  // Update this with your actual backend URL

  constructor(private http: HttpClient) { }

  uploadVideo(video: File, title: string, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);

    return this.http.post(`${this.baseUrl}/youtube/upload`, formData);
  }

  scheduleVideo(video: File, title: string, description: string, publishDate: string): Observable<any> {
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('publishDate', publishDate);

    return this.http.post(`${this.baseUrl}/youtube/schedule`, formData);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/youtube/profile`);
  }

  getComments(videoId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/youtube/comments/${videoId}`);
  }

  replyToComment(commentId: string, text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/youtube/comment/reply`, { commentId, text });
  }

  likeComment(commentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/youtube/comment/like`, { commentId });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/youtube/comment/delete/${commentId}`);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/youtube/logout`, {});
  }
}
