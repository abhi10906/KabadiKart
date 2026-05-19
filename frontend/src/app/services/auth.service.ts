import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, credentials).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('kk_admin_token', res.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('kk_admin_token');
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('kk_admin_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}