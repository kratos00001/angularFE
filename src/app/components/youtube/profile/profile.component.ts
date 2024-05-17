import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  videos: any[] = [];
  user: any;

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {
    this.youtubeService.getProfile().subscribe(
      data => {
        this.videos = data.videos;
        this.user = data.user;
      },
      error => {
        console.error('Error fetching profile data', error);
      }
    );
  }

}
