import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="confirm-page">
      <div class="confirm-card">

        <div class="success-ring">
          <div class="ring-anim"></div>
          <span class="check-icon">✔</span>
        </div>

        <h1>Booking Confirmed!</h1>
        <p class="confirm-sub">
          Your pickup has been scheduled. Our team will reach out before arrival.
        </p>

        <div class="booking-summary" *ngIf="booking">
          <div class="summary-row">
            <span>👤 Name</span>
            <strong>{{ booking.name }}</strong>
          </div>
          <div class="summary-row">
            <span>📞 Phone</span>
            <strong>{{ booking.phone }}</strong>
          </div>
          <div class="summary-row">
            <span>📍 Address</span>
            <strong>{{ booking.address }}</strong>
          </div>
          <div class="summary-row">
            <span>🔩 Scrap Type</span>
            <strong>{{ booking.scrapType }}</strong>
          </div>
          <div class="summary-row">
            <span>📅 Date</span>
            <strong>{{ booking.pickupDate | date:'dd MMM yyyy' }}</strong>
          </div>
          <div class="summary-row" *ngIf="booking.timeSlot">
            <span>🕐 Time Slot</span>
            <strong>{{ booking.timeSlot }}</strong>
          </div>
          <div class="summary-row">
            <span>🔖 Status</span>
            <strong class="status-badge">Pending</strong>
          </div>
        </div>

        <div class="confirm-actions">
          <a routerLink="/book" class="btn-secondary">Book Another Pickup</a>
          <a routerLink="/" class="btn-primary">Back to Home →</a>
        </div>

        <p class="confirm-note">
          💡 The admin will review your request and assign a pickup agent shortly.
        </p>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

    .confirm-page {
      min-height: 100vh;
      background: #0d0d0d;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
    }
    .confirm-card {
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 20px;
      padding: 3rem 2.5rem;
      max-width: 520px;
      width: 100%;
      text-align: center;
    }
    .success-ring {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ring-anim {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid #4ade80;
      animation: ring-pulse 2s ease-out infinite;
    }
    @keyframes ring-pulse {
      0% { transform: scale(0.9); opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }
    .check-icon {
      font-size: 2.5rem;
      background: rgba(74,222,128,0.15);
      border: 2px solid #4ade80;
      border-radius: 50%;
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4ade80;
      position: relative;
    }
    h1 {
      font-family: 'Syne', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: #f0fdf4;
      margin: 0 0 0.75rem;
    }
    .confirm-sub { color: #6b7280; font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6; }
    .booking-summary {
      background: #0d150d;
      border: 1px solid #1e2d1e;
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 2rem;
      text-align: left;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #1e2d1e;
      font-size: 0.88rem;
    }
    .summary-row:last-child { border-bottom: none; }
    .summary-row span { color: #6b7280; }
    .summary-row strong { color: #e8f5e8; font-weight: 600; max-width: 55%; text-align: right; }
    .status-badge {
      background: rgba(234,179,8,0.15);
      border: 1px solid rgba(234,179,8,0.3);
      color: #fbbf24 !important;
      padding: 2px 10px;
      border-radius: 100px;
      font-size: 0.78rem;
    }
    .confirm-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .btn-primary, .btn-secondary {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
      text-align: center;
      transition: all 0.2s;
      display: block;
    }
    .btn-primary { background: #4ade80; color: #0a0f0a; }
    .btn-primary:hover { background: #22c55e; }
    .btn-secondary { background: transparent; border: 1px solid #374151; color: #9ca3af; }
    .btn-secondary:hover { border-color: #4ade80; color: #4ade80; }
    .confirm-note {
      font-size: 0.8rem;
      color: #4b5563;
      line-height: 1.5;
      margin: 0;
    }
  `]
})
export class ConfirmationComponent implements OnInit {
  booking: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
  const nav = this.router.getCurrentNavigation();
  this.booking = nav?.extras?.state?.['booking'];

  // Fallback — works after component is already loaded
  if (!this.booking) {
    const state = history.state;
    if (state && state.booking) {
      this.booking = state.booking;
    } else {
      this.router.navigate(['/']);
    }
  }
}
}