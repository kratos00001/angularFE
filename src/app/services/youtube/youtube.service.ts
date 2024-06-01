import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  public baseUrl = 'https://localhost:3000';  // Update this with your actual backend URL

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<{ loggedIn: boolean }>(`${this.baseUrl}/auth/check`, { withCredentials: true })
      .pipe(
        map(response => response.loggedIn)
      );
  }

  youtubeLogin(): void {
    window.location.href = `${this.baseUrl}/auth/youtube`;
  }

  uploadVideo(video: File, title: string, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
  
    return this.http.post(`${this.baseUrl}/youtube/upload`, formData, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error uploading video', error);
          return of(null); // Return null in case of error
        })
      );
  }
  
  scheduleVideo(video: File, title: string, description: string, publishDate: string): Observable<any> {
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('publishDate', publishDate);
  
    return this.http.post(`${this.baseUrl}/youtube/schedule`, formData, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error scheduling video', error);
          return of(null); // Return null in case of error
        })
      );
  }
  
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/youtube/logout`, {}, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error logging out', error);
          return of(null); // Return null in case of error
        })
      );
  }
  
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/youtube/profile`, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error fetching profile data', error);
          return of(null); // Return null in case of error
        })
      );
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

  getVideos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/youtube/videos`, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error fetching videos data', error);
          return of(null); // Return null in case of error
        })
      );
  }
}
