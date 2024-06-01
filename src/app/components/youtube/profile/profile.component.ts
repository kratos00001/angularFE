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

  constructor(private youtubeAuthService: YoutubeService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.youtubeAuthService.isLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        // Fetch user profile data if logged in
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
      } else {
        console.log('User is not logged in');
      }
    });
  
    // Check if redirected from YouTube login
    if (window.location.href.includes(`${this.youtubeAuthService.baseUrl}/auth/youtube/callback`)) {
      this.checkLoginStatus();
    }
  }
  

  login() {
    this.youtubeAuthService.youtubeLogin();
    this.checkLoginStatus();
  }
  
}
