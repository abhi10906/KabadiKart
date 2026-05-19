import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard">

      <!-- Header -->
      <div class="dash-header">
        <div class="dash-header-left">
          <div class="dash-badge">🛠 Admin Dashboard</div>
          <h1>Booking Management</h1>
          <p>Manage all pickup requests, update statuses, and arrange collection.</p>
        </div>
        <div class="dash-header-right">
          <button class="btn-refresh" (click)="loadBookings()" [disabled]="loading">
            {{ loading ? 'Loading...' : '↻ Refresh' }}
          </button>
          <button class="btn-logout" (click)="auth.logout()">Logout</button>
        </div>
      </div>

      <!-- Stats Strip -->
      <div class="stats-strip">
        <div class="stat-card">
          <strong>{{ bookings.length }}</strong>
          <span>Total Bookings</span>
        </div>
        <div class="stat-card">
          <strong class="s-yellow">{{ countByStatus('Pending') }}</strong>
          <span>Pending</span>
        </div>
        <div class="stat-card">
          <strong class="s-blue">{{ countByStatus('Confirmed') }}</strong>
          <span>Confirmed</span>
        </div>
        <div class="stat-card">
          <strong class="s-green">{{ countByStatus('Completed') }}</strong>
          <span>Completed</span>
        </div>
        <div class="stat-card">
          <strong class="s-red">{{ countByStatus('Cancelled') }}</strong>
          <span>Cancelled</span>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <input type="text" [(ngModel)]="searchTerm" placeholder="🔍 Search by name, phone, address..." />
        <select [(ngModel)]="filterStatus">
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <!-- Alert -->
      <div class="alert alert-success" *ngIf="successMsg">✔ {{ successMsg }}</div>
      <div class="alert alert-error" *ngIf="errorMsg">⚠ {{ errorMsg }}</div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading && filteredBookings.length === 0">
        <div class="empty-icon">🗂</div>
        <p>{{ bookings.length === 0 ? 'No bookings yet.' : 'No bookings match your filter.' }}</p>
      </div>

      <!-- Loading -->
      <div class="loading-state" *ngIf="loading">
        <div class="spinner"></div>
        <p>Loading bookings...</p>
      </div>

      <!-- Bookings Table / Cards -->
      <div class="bookings-list" *ngIf="!loading">
        <div class="booking-row" *ngFor="let b of filteredBookings"
          [class.status-pending]="b.status === 'Pending'"
          [class.status-confirmed]="b.status === 'Confirmed'"
          [class.status-completed]="b.status === 'Completed'"
          [class.status-cancelled]="b.status === 'Cancelled'">

          <div class="row-left">
            <div class="row-avatar">{{ b.name?.charAt(0)?.toUpperCase() }}</div>
            <div class="row-info">
              <strong class="row-name">{{ b.name }}</strong>
              <span class="row-phone">{{ b.phone }}</span>
              <span class="row-address">📍 {{ b.address }}</span>
            </div>
          </div>

          <div class="row-scrap">
            <span class="scrap-badge">{{ b.scrapType }}</span>
            <span class="row-qty" *ngIf="b.quantity">⚖ {{ b.quantity }} kg</span>
          </div>

          <div class="row-schedule">
            <span>📅 {{ b.pickupDate | date:'dd MMM yyyy' }}</span>
            <span *ngIf="b.timeSlot">🕐 {{ b.timeSlot }}</span>
          </div>

          <div class="row-status">
            <span class="status-pill" [class]="'pill-' + (b.status || 'Pending') | lowercase">
              {{ b.status || 'Pending' }}
            </span>
          </div>

          <div class="row-actions">
            <!-- Status Update -->
            <select class="status-select" [(ngModel)]="b.status" (change)="updateStatus(b)">
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <button class="btn-delete" (click)="deleteBooking(b._id!)">🗑</button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

    .dashboard {
      min-height: 100vh;
      background: #0d0d0d;
      padding: 2rem 2.5rem;
    }

    /* HEADER */
    .dash-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #1e2d1e;
    }
    .dash-badge {
      display: inline-block;
      background: rgba(251,191,36,0.1);
      border: 1px solid rgba(251,191,36,0.25);
      color: #fbbf24;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }
    .dash-header h1 {
      font-family: 'Syne', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: #f0fdf4;
      margin: 0 0 0.5rem;
    }
    .dash-header p { color: #6b7280; font-size: 0.88rem; margin: 0; }
    .dash-header-right { display: flex; gap: 0.75rem; align-items: center; }
    .btn-refresh {
      background: transparent;
      border: 1px solid #374151;
      color: #9ca3af;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    .btn-refresh:hover { border-color: #4ade80; color: #4ade80; }
    .btn-logout {
      background: transparent;
      border: 1px solid #374151;
      color: #9ca3af;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    .btn-logout:hover { border-color: #ef4444; color: #ef4444; }

    /* STATS */
    .stats-strip {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .stat-card {
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 10px;
      padding: 1.25rem;
      text-align: center;
    }
    .stat-card strong { display: block; font-size: 1.8rem; font-weight: 800; color: #e8f5e8; }
    .stat-card span { font-size: 0.75rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
    .s-yellow { color: #fbbf24 !important; }
    .s-blue   { color: #60a5fa !important; }
    .s-green  { color: #4ade80 !important; }
    .s-red    { color: #f87171 !important; }

    /* FILTER */
    .filter-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .filter-bar input {
      flex: 1;
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 8px;
      padding: 10px 16px;
      color: #e8f5e8;
      font-size: 0.9rem;
      outline: none;
    }
    .filter-bar input:focus { border-color: #4ade80; }
    .filter-bar input::placeholder { color: #4b5563; }
    .filter-bar select {
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 8px;
      padding: 10px 14px;
      color: #e8f5e8;
      font-size: 0.9rem;
      outline: none;
      cursor: pointer;
      min-width: 160px;
    }
    .filter-bar select:focus { border-color: #4ade80; }

    /* ALERTS */
    .alert { padding: 12px 16px; border-radius: 8px; font-size: 0.88rem; margin-bottom: 1.25rem; }
    .alert-success { background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.3); color: #86efac; }
    .alert-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #fca5a5; }

    /* EMPTY / LOADING */
    .empty-state, .loading-state {
      text-align: center;
      padding: 5rem 2rem;
      color: #4b5563;
    }
    .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
    .empty-state p, .loading-state p { font-size: 0.95rem; }
    .spinner {
      width: 36px;
      height: 36px;
      border: 2px solid #1e2d1e;
      border-top-color: #4ade80;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* BOOKING ROWS */
    .bookings-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .booking-row {
      background: #111811;
      border: 1px solid #1e2d1e;
      border-left: 3px solid #374151;
      border-radius: 10px;
      padding: 1.25rem 1.5rem;
      display: grid;
      grid-template-columns: 2fr 1.5fr 1.5fr 1fr 1.5fr;
      gap: 1rem;
      align-items: center;
      transition: border-color 0.2s;
    }
    .booking-row:hover { border-color: #374151; border-left-color: #4ade80; }
    .status-pending   { border-left-color: #fbbf24 !important; }
    .status-confirmed { border-left-color: #60a5fa !important; }
    .status-completed { border-left-color: #4ade80 !important; }
    .status-cancelled { border-left-color: #f87171 !important; opacity: 0.65; }

    .row-left { display: flex; align-items: center; gap: 0.75rem; }
    .row-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(74,222,128,0.15);
      border: 1px solid rgba(74,222,128,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      color: #4ade80;
      flex-shrink: 0;
    }
    .row-info { display: flex; flex-direction: column; gap: 2px; }
    .row-name { color: #e8f5e8; font-size: 0.95rem; font-weight: 600; }
    .row-phone, .row-address { color: #6b7280; font-size: 0.78rem; }

    .row-scrap { display: flex; flex-direction: column; gap: 4px; }
    .scrap-badge {
      display: inline-block;
      background: rgba(74,222,128,0.08);
      border: 1px solid rgba(74,222,128,0.2);
      color: #86efac;
      padding: 3px 10px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      width: fit-content;
    }
    .row-qty { color: #6b7280; font-size: 0.78rem; }

    .row-schedule { display: flex; flex-direction: column; gap: 4px; color: #9ca3af; font-size: 0.82rem; }

    .status-pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.03em;
    }
    .pill-pending   { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
    .pill-confirmed { background: rgba(96,165,250,0.15); color: #60a5fa; border: 1px solid rgba(96,165,250,0.3); }
    .pill-completed { background: rgba(74,222,128,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
    .pill-cancelled { background: rgba(248,113,113,0.15); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }

    .row-actions { display: flex; gap: 0.5rem; align-items: center; }
    .status-select {
      background: #0d150d;
      border: 1px solid #1e2d1e;
      border-radius: 6px;
      padding: 6px 10px;
      color: #e8f5e8;
      font-size: 0.8rem;
      cursor: pointer;
      outline: none;
      flex: 1;
    }
    .status-select:focus { border-color: #4ade80; }
    .btn-delete {
      background: transparent;
      border: 1px solid #374151;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s;
      color: #6b7280;
    }
    .btn-delete:hover { border-color: #ef4444; color: #ef4444; }

    @media (max-width: 1024px) {
      .booking-row { grid-template-columns: 1fr 1fr; }
      .stats-strip { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 600px) {
      .dashboard { padding: 1.5rem; }
      .booking-row { grid-template-columns: 1fr; }
      .dash-header { flex-direction: column; gap: 1rem; }
      .stats-strip { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  bookings: Booking[] = [];
  loading = false;
  successMsg = '';
  errorMsg = '';
  searchTerm = '';
  filterStatus = '';

  get filteredBookings(): Booking[] {
    return this.bookings.filter(b => {
      const matchSearch = !this.searchTerm ||
        b.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.phone.includes(this.searchTerm) ||
        b.address.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = !this.filterStatus || b.status === this.filterStatus;
      return matchSearch && matchStatus;
    });
  }

  countByStatus(status: string): number {
    return this.bookings.filter(b => (b.status || 'Pending') === status).length;
  }

  constructor(private bookingService: BookingService, public auth: AuthService) {}

  ngOnInit() { this.loadBookings(); }

  loadBookings() {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: data => { this.bookings = data; this.loading = false; },
      error: () => { this.errorMsg = 'Failed to load bookings.'; this.loading = false; }
    });
  }

  updateStatus(booking: Booking) {
    if (!booking._id) return;
    this.bookingService.updateBooking(booking._id, booking).subscribe({
      next: () => this.showSuccess(`Status updated to "${booking.status}"`),
      error: () => { this.errorMsg = 'Failed to update status.'; }
    });
  }

  deleteBooking(id: string) {
    if (!confirm('Delete this booking permanently?')) return;
    this.bookingService.deleteBooking(id).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b._id !== id);
        this.showSuccess('Booking deleted.');
      },
      error: () => { this.errorMsg = 'Failed to delete.'; }
    });
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    this.errorMsg = '';
    setTimeout(() => this.successMsg = '', 3000);
  }
}