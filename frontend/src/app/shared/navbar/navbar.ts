import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="brand">
        <span class="brand-icon">♻</span>
        <span class="brand-name">KabadiKart</span>
      </a>
      <div class="nav-links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
        <a routerLink="/book" routerLinkActive="active">Book Pickup</a>
        <ng-container *ngIf="auth.isLoggedIn(); else adminLink">
          <a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a>
          <button class="btn-logout" (click)="auth.logout()">Logout</button>
        </ng-container>
        <ng-template #adminLink>
          <a routerLink="/admin/login" routerLinkActive="active" class="admin-link">Admin</a>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      background: #0d0d0d;
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid #1e2d1e;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .brand-icon {
      font-size: 1.5rem;
      filter: drop-shadow(0 0 6px #22c55e88);
    }
    .brand-name {
      font-family: 'Syne', sans-serif;
      font-size: 1.3rem;
      font-weight: 800;
      color: #e8f5e8;
      letter-spacing: -0.02em;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .nav-links a {
      color: #9ca3af;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.2s;
      letter-spacing: 0.02em;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #4ade80;
    }
    .admin-link { color: #f59e0b !important; }
    .btn-logout {
      background: transparent;
      border: 1px solid #374151;
      color: #9ca3af;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    .btn-logout:hover { border-color: #ef4444; color: #ef4444; }
  `]
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}
}