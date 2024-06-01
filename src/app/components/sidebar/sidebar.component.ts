
import { Component } from '@angular/core';
import { faBookmark, faChartBar, faComment, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
selector: 'app-sidebar',
templateUrl: './sidebar.component.html',
styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
home = faHome;
chart = faChartBar;
message = faComment;
bookmark = faBookmark;
user = faUser;
youtube = faBookmark;
}