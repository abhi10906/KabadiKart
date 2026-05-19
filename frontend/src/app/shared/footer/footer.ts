import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="brand-icon">♻</span>
          <span class="brand-name">KabadiKart</span>
        </div>
        <p class="footer-tagline">Book. Pickup. Recycle.</p>
        <div class="footer-links">
          <a routerLink="/">Home</a>
          <a routerLink="/book">Book Pickup</a>
          <a routerLink="/admin/login">Admin</a>
        </div>
        <p class="footer-copy">© 2025 KabadiKart. Built with the MEAN Stack.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #0a0f0a;
      border-top: 1px solid #1e2d1e;
      padding: 2rem;
      text-align: center;
    }
    .footer-inner { max-width: 800px; margin: 0 auto; }
    .footer-brand {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0.5rem;
    }
    .brand-icon { font-size: 1.2rem; }
    .brand-name {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: #e8f5e8;
    }
    .footer-tagline {
      color: #4ade80;
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin: 0 0 1rem;
    }
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }
    .footer-links a {
      color: #6b7280;
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: #4ade80; }
    .footer-copy { color: #4b5563; font-size: 0.78rem; margin: 0; }
  `]
})
export class FooterComponent {}