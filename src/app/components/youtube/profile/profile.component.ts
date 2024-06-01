import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  loggedIn: boolean | undefined;
  videos: any[] = [];
  selectedVideo: File | null = null;
  title: string = '';
  description: string = '';
  publishDate: string = '';

  constructor(private youtubeAuthService: YoutubeService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.youtubeAuthService.isLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.fetchProfile();
        this.fetchVideos();
      } else {
        console.log('User is not logged in');
      }
    });

    if (window.location.href.includes(`${this.youtubeAuthService.baseUrl}/auth/youtube/callback`)) {
      this.checkLoginStatus();
    }
  }

  fetchProfile() {
    this.youtubeAuthService.getProfile().subscribe(
      data => {
        if (data) {
          this.profile = data;
        } else {
          console.error('Profile data is null');
        }
      },
      error => {
        console.error('Error fetching profile data', error);
      }
    );
  }

  fetchVideos() {
    this.youtubeAuthService.getVideos().subscribe(
      videos => {
        if (videos) {
          this.videos = videos;
        } else {
          console.error('Videos data is null');
        }
      },
      error => {
        console.error('Error fetching videos data', error);
      }
    );
  }

  onVideoSelected(event: any): void {
    this.selectedVideo = event.target.files[0];
  }

  uploadVideo(): void {
    if (this.selectedVideo) {
      this.youtubeAuthService.uploadVideo(this.selectedVideo, this.title, this.description).subscribe(
        response => {
          if (response) {
            alert('Video uploaded successfully!');
            this.fetchVideos();
          } else {
            alert('Failed to upload video.');
          }
        },
        error => {
          console.error('Error uploading video', error);
          alert('Failed to upload video.');
        }
      );
    } else {
      alert('Please select a video file.');
    }
  }

  scheduleVideo(): void {
    if (this.selectedVideo) {
      this.youtubeAuthService.scheduleVideo(this.selectedVideo, this.title, this.description, this.publishDate).subscribe(
        response => {
          if (response) {
            alert('Video scheduled successfully!');
            this.fetchVideos();
          } else {
            alert('Failed to schedule video.');
          }
        },
        error => {
          console.error('Error scheduling video', error);
          alert('Failed to schedule video.');
        }
      );
    } else {
      alert('Please select a video file.');
    }
  }

  logout(): void {
    this.youtubeAuthService.logout().subscribe(
      response => {
        if (response) {
          window.location.href = '/';
        } else {
          alert('Failed to logout.');
        }
      },
      error => {
        console.error('Error logging out', error);
        alert('Failed to logout.');
      }
    );
  }

  login(): void {
    this.youtubeAuthService.youtubeLogin();
    this.checkLoginStatus();
  }
}
