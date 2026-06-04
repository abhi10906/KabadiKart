import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">

        <div class="login-header">
          <div class="admin-badge">🔐 Admin Portal</div>
          <h1>KabadiKart<br><span>Admin Login</span></h1>
          <p>Access the admin dashboard to manage bookings and pickups.</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="field-group">
            <label>Email Address</label>
            <input type="email" formControlName="email" placeholder="admin@kabadikart.com"
              [class.error]="isInvalid('email')" autocomplete="username" />
            <span class="error-msg" *ngIf="isInvalid('email')">Enter a valid email</span>
          </div>
          <div class="field-group">
            <label>Password</label>
            <div class="pass-wrap">
              <input [type]="showPass ? 'text' : 'password'" formControlName="password"
                placeholder="••••••••" [class.error]="isInvalid('password')"
                autocomplete="current-password" />
              <button type="button" class="pass-toggle" (click)="showPass = !showPass">
                {{ showPass ? '🙈' : '👁' }}
              </button>
            </div>
            <span class="error-msg" *ngIf="isInvalid('password')">Password required</span>
          </div>

          <div class="alert-error" *ngIf="errorMsg">⚠ {{ errorMsg }}</div>

          <button type="submit" class="btn-login" [disabled]="loginForm.invalid || loading">
            <span *ngIf="!loading">Login to Dashboard →</span>
            <span *ngIf="loading" class="spinner"></span>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

    .login-page {
      min-height: 100vh;
      background: #0d0d0d;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }
    .login-page::before {
      content: '';
      position: absolute;
      bottom: -20%;
      right: -10%;
      width: 50%;
      height: 50%;
      background: radial-gradient(ellipse, rgba(251,191,36,0.06) 0%, transparent 70%);
      pointer-events: none;
    }
    .login-card {
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 20px;
      padding: 3rem 2.5rem;
      width: 100%;
      max-width: 420px;
      position: relative;
    }
    .login-header { margin-bottom: 2rem; }
    .admin-badge {
      display: inline-block;
      background: rgba(251,191,36,0.1);
      border: 1px solid rgba(251,191,36,0.25);
      color: #fbbf24;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    h1 {
      font-family: 'Syne', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: #f0fdf4;
      line-height: 1.1;
      margin: 0 0 0.75rem;
    }
    h1 span { color: #fbbf24; }
    .login-header p { color: #6b7280; font-size: 0.88rem; margin: 0; line-height: 1.6; }
    .field-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1.25rem; }
    label { font-size: 0.82rem; font-weight: 600; color: #9ca3af; }
    input {
      background: #0d150d;
      border: 1px solid #1e2d1e;
      border-radius: 8px;
      padding: 12px 14px;
      color: #e8f5e8;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
    }
    input::placeholder { color: #374151; }
    input:focus { border-color: #fbbf24; }
    input.error { border-color: #ef4444; }
    .pass-wrap { position: relative; }
    .pass-wrap input { padding-right: 44px; }
    .pass-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
    }
    .error-msg { font-size: 0.75rem; color: #ef4444; }
    .alert-error {
      background: rgba(239,68,68,0.1);
      border: 1px solid rgba(239,68,68,0.3);
      color: #fca5a5;
      padding: 12px;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 1.25rem;
    }
    .btn-login {
      width: 100%;
      background: #fbbf24;
      color: #0a0f0a;
      border: none;
      padding: 14px;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 1.5rem;
    }
    .btn-login:hover:not(:disabled) { background: #f59e0b; }
    .btn-login:disabled { opacity: 0.5; cursor: not-allowed; }
    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(0,0,0,0.3);
      border-top-color: #0a0f0a;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .dev-note {
      background: rgba(99,102,241,0.08);
      border: 1px solid rgba(99,102,241,0.2);
      border-radius: 8px;
      padding: 1rem;
    }
    .dev-note p { margin: 0; font-size: 0.8rem; color: #818cf8; line-height: 1.5; }
    .dev-note strong { color: #a5b4fc; }
    .dev-note code {
      background: rgba(99,102,241,0.15);
      padding: 1px 5px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 0.78rem;
    }
  `]
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';
  showPass = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Redirect if already logged in
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  isInvalid(field: string): boolean {
    const c = this.loginForm.get(field);
    return !!(c?.invalid && c?.touched);
  }

  onSubmit() {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMsg = '';

    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.status === 401 ? 'Invalid credentials.' : 'Login failed. Check server connection.';
      }
    });
  }
}