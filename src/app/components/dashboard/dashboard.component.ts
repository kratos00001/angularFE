import { Component, OnInit } from '@angular/core';
import { faPen, faMoneyBill, faUsers, faClock, faBriefcase, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
  }

  edit = faPen;
  out = faUserLock;
  budget = faMoneyBill;
  project = faUsers;
  time = faClock;
  work = faBriefcase;
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}