import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.setItem('isAuthenticated', 'false');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
