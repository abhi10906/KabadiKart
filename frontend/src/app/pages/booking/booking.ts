import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="booking-page">
      <div class="booking-container">

        <!-- Left Panel -->
        <div class="booking-info">
          <div class="info-badge">Step-by-step</div>
          <h1 class="info-title">Schedule Your<br><span>Scrap Pickup</span></h1>
          <p class="info-sub">Fill in the details below and we'll arrange a pickup at your convenience.</p>

          <div class="info-steps">
            <div class="info-step" [class.active]="currentStep >= 1">
              <div class="step-dot">1</div>
              <div>
                <strong>Your Details</strong>
                <span>Name, phone, address</span>
              </div>
            </div>
            <div class="info-step" [class.active]="currentStep >= 2">
              <div class="step-dot">2</div>
              <div>
                <strong>Scrap Info</strong>
                <span>Type and quantity</span>
              </div>
            </div>
            <div class="info-step" [class.active]="currentStep >= 3">
              <div class="step-dot">3</div>
              <div>
                <strong>Schedule</strong>
                <span>Date and time slot</span>
              </div>
            </div>
          </div>

          <div class="info-tip">
            <span class="tip-icon">💡</span>
            <p>Slots fill up fast! Book at least a day in advance for guaranteed pickup.</p>
          </div>
        </div>

        <!-- Right Panel - Form -->
        <div class="booking-form-panel">
          <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" novalidate>

            <!-- Step 1: Personal Details -->
            <div class="form-section">
              <div class="form-section-label">
                <span class="section-num">01</span> Your Details
              </div>
              <div class="field-row">
                <div class="field-group">
                  <label>Full Name <span class="req">*</span></label>
                  <input type="text" formControlName="name" placeholder="e.g. Amit Sharma"
                    [class.field-error]="isInvalid('name')" />
                  <span class="error-msg" *ngIf="isInvalid('name')">Min 3 characters required</span>
                </div>
                <div class="field-group">
                  <label>Phone Number <span class="req">*</span></label>
                  <input type="text" formControlName="phone" placeholder="10-digit number"
                    maxlength="10" [class.field-error]="isInvalid('phone')" />
                  <span class="error-msg" *ngIf="isInvalid('phone')">Enter valid 10-digit number</span>
                </div>
              </div>
              <div class="field-group full">
                <label>Pickup Address <span class="req">*</span></label>
                <input type="text" formControlName="address" placeholder="House no, Street, Area, City"
                  [class.field-error]="isInvalid('address')" />
                <span class="error-msg" *ngIf="isInvalid('address')">Address is required</span>
              </div>
            </div>

            <!-- Step 2: Scrap Details -->
            <div class="form-section">
              <div class="form-section-label">
                <span class="section-num">02</span> Scrap Information
              </div>
              <div class="field-row">
                <div class="field-group">
                  <label>Scrap Type <span class="req">*</span></label>
                  <select formControlName="scrapType" [class.field-error]="isInvalid('scrapType')">
                    <option value="" disabled>Select scrap type</option>
                    <optgroup *ngFor="let cat of scrapCategories" [label]="cat.label">
                      <option *ngFor="let opt of cat.options" [value]="opt">{{ opt }}</option>
                    </optgroup>
                  </select>
                  <span class="error-msg" *ngIf="isInvalid('scrapType')">Please select a type</span>
                </div>
                <div class="field-group">
                  <label>Approx. Quantity (kg)</label>
                  <input type="number" formControlName="quantity" placeholder="e.g. 10" min="1" />
                </div>
              </div>
              <div class="field-group full">
                <label>Additional Notes</label>
                <textarea formControlName="notes" rows="2"
                  placeholder="Any special instructions or description of scrap..."></textarea>
              </div>
            </div>

            <!-- Step 3: Schedule -->
            <div class="form-section">
              <div class="form-section-label">
                <span class="section-num">03</span> Pick a Schedule
              </div>
              <div class="field-row">
                <div class="field-group">
                  <label>Pickup Date <span class="req">*</span></label>
                  <input type="date" formControlName="pickupDate" [min]="minDate"
                    (change)="onDateChange()" [class.field-error]="isInvalid('pickupDate')" />
                  <span class="error-msg" *ngIf="isInvalid('pickupDate')">Select a date</span>
                </div>
                <div class="field-group">
                  <label>Time Slot <span class="req">*</span></label>
                  <select formControlName="timeSlot" [disabled]="!bookingForm.get('pickupDate')?.value"
                    [class.field-error]="isInvalid('timeSlot')">
                    <option value="" disabled>
                      {{ bookingForm.get('pickupDate')?.value ? 'Choose a slot' : 'Pick a date first' }}
                    </option>
                    <option *ngFor="let slot of availableSlots" [value]="slot">{{ slot }}</option>
                    <option *ngIf="bookingForm.get('pickupDate')?.value && availableSlots.length === 0" disabled>
                      No slots available today
                    </option>
                  </select>
                  <span class="error-msg" *ngIf="isInvalid('timeSlot')">Select a time slot</span>
                </div>
              </div>
            </div>

            <!-- Error / Success -->
            <div class="alert alert-error" *ngIf="errorMsg">⚠ {{ errorMsg }}</div>
            <div class="alert alert-success" *ngIf="successMsg">✔ {{ successMsg }}</div>

            <!-- Submit -->
            <button type="submit" class="btn-submit" [disabled]="bookingForm.invalid || loading">
              <span *ngIf="!loading">Confirm Pickup Booking →</span>
              <span *ngIf="loading" class="spinner"></span>
            </button>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

    .booking-page {
      min-height: 100vh;
      background: #0d0d0d;
      padding: 3rem 2rem;
    }
    .booking-container {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 3rem;
      align-items: start;
    }

    /* LEFT PANEL */
    .booking-info {
      position: sticky;
      top: 80px;
      background: #080c08;
      border: 1px solid #1e2d1e;
      border-radius: 16px;
      padding: 2.5rem 2rem;
    }
    .info-badge {
      display: inline-block;
      background: rgba(74,222,128,0.1);
      border: 1px solid rgba(74,222,128,0.25);
      color: #4ade80;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      margin-bottom: 1.25rem;
    }
    .info-title {
      font-family: 'Syne', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: #f0fdf4;
      line-height: 1.15;
      margin: 0 0 1rem;
    }
    .info-title span { color: #4ade80; }
    .info-sub { color: #6b7280; font-size: 0.9rem; line-height: 1.6; margin-bottom: 2rem; }
    .info-steps { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
    .info-step {
      display: flex;
      align-items: center;
      gap: 1rem;
      opacity: 0.4;
      transition: opacity 0.3s;
    }
    .info-step.active { opacity: 1; }
    .step-dot {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #1e2d1e;
      border: 1px solid #374151;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
      color: #9ca3af;
      flex-shrink: 0;
    }
    .info-step.active .step-dot { background: rgba(74,222,128,0.15); border-color: #4ade80; color: #4ade80; }
    .info-step div strong { display: block; color: #e8f5e8; font-size: 0.9rem; font-weight: 600; }
    .info-step div span { color: #6b7280; font-size: 0.8rem; }
    .info-tip {
      background: rgba(234,179,8,0.08);
      border: 1px solid rgba(234,179,8,0.2);
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }
    .tip-icon { font-size: 1.1rem; flex-shrink: 0; }
    .info-tip p { margin: 0; font-size: 0.82rem; color: #d97706; line-height: 1.5; }

    /* RIGHT PANEL */
    .booking-form-panel {
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 16px;
      padding: 2.5rem;
    }
    .form-section { margin-bottom: 2.5rem; }
    .form-section-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #9ca3af;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #1e2d1e;
    }
    .section-num {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: rgba(74,222,128,0.4);
    }
    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .field-group.full { grid-column: 1 / -1; }
    label {
      font-size: 0.82rem;
      font-weight: 600;
      color: #9ca3af;
      letter-spacing: 0.02em;
    }
    .req { color: #4ade80; }
    input, select, textarea {
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
    input::placeholder, textarea::placeholder { color: #374151; }
    input:focus, select:focus, textarea:focus { border-color: #4ade80; }
    input.field-error, select.field-error { border-color: #ef4444; }
    select option { background: #111811; color: #e8f5e8; }
    textarea { resize: vertical; min-height: 80px; }
    input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.4); }
    select:disabled { opacity: 0.5; cursor: not-allowed; }
    .error-msg { font-size: 0.75rem; color: #ef4444; }
    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.88rem;
      margin-bottom: 1.25rem;
    }
    .alert-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #fca5a5; }
    .alert-success { background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.3); color: #86efac; }
    .btn-submit {
      width: 100%;
      background: #4ade80;
      color: #0a0f0a;
      border: none;
      padding: 16px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      letter-spacing: 0.01em;
    }
    .btn-submit:hover:not(:disabled) { background: #22c55e; transform: translateY(-1px); }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    .spinner {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(0,0,0,0.3);
      border-top-color: #0a0f0a;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 900px) {
      .booking-container { grid-template-columns: 1fr; }
      .booking-info { position: static; }
      .field-row { grid-template-columns: 1fr; }
    }
  `]
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';
  availableSlots: string[] = [];
  currentStep = 1;

  allTimeSlots = [
    '08:00 AM – 09:00 AM', '09:00 AM – 10:00 AM', '10:00 AM – 11:00 AM',
    '11:00 AM – 12:00 PM', '12:00 PM – 01:00 PM', '02:00 PM – 03:00 PM',
    '03:00 PM – 04:00 PM', '04:00 PM – 05:00 PM', '05:00 PM – 06:00 PM',
  ];

  scrapCategories = [
    { label: '🔩 Ferrous Metals', options: ['Iron', 'Steel', 'Cast Iron', 'Stainless Steel'] },
    { label: '🟡 Non-Ferrous Metals', options: ['Copper', 'Aluminium', 'Brass', 'Lead', 'Zinc'] },
    { label: '📦 Paper & Cardboard', options: ['Newspaper', 'Cardboard', 'White Paper', 'Mixed Paper'] },
    { label: '🧴 Plastic', options: ['PET Bottles', 'HDPE', 'PVC', 'Mixed Plastic'] },
    { label: '💻 E-Waste', options: ['Old Mobile', 'Laptop / PC', 'TV / Monitor', 'Wires & Cables', 'Batteries'] },
    { label: '🪵 Other', options: ['Glass', 'Rubber', 'Wood', 'Mixed Scrap'] },
  ];

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  constructor(private fb: FormBuilder, private bookingService: BookingService, private router: Router) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name:       ['', [Validators.required, Validators.minLength(3)]],
      phone:      ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address:    ['', Validators.required],
      scrapType:  ['', Validators.required],
      quantity:   [''],
      notes:      [''],
      pickupDate: ['', Validators.required],
      timeSlot:   ['', Validators.required],
    });

    // Track which step user is on
    this.bookingForm.get('name')?.valueChanges.subscribe(() => this.updateStep());
    this.bookingForm.get('scrapType')?.valueChanges.subscribe(() => this.updateStep());
    this.bookingForm.get('pickupDate')?.valueChanges.subscribe(() => this.updateStep());
  }

  updateStep() {
    const v = this.bookingForm.value;
    if (v.pickupDate) { this.currentStep = 3; return; }
    if (v.scrapType)  { this.currentStep = 2; return; }
    this.currentStep = 1;
  }

  isInvalid(field: string): boolean {
    const c = this.bookingForm.get(field);
    return !!(c?.invalid && c?.touched);
  }

  onDateChange() {
    this.bookingForm.patchValue({ timeSlot: '' });
    const dateVal = this.bookingForm.get('pickupDate')?.value;
    if (!dateVal) { this.availableSlots = []; return; }

    const selected = new Date(dateVal);
    const today = new Date();
    const isToday = selected.toDateString() === today.toDateString();

    if (isToday) {
      const currentHour = today.getHours();
      this.availableSlots = this.allTimeSlots.filter(slot => {
        const hour = parseInt(slot.split(':')[0], 10);
        const isPM = slot.includes('PM') && hour !== 12;
        const hour24 = isPM ? hour + 12 : (hour === 12 && slot.includes('AM') ? 0 : hour);
        return hour24 > currentHour + 1;
      });
    } else {
      this.availableSlots = [...this.allTimeSlots];
    }
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = '';

    this.bookingService.addBooking(this.bookingForm.value).subscribe({
      next: (booking) => {
        this.loading = false;
        this.router.navigate(['/confirmation'], { state: { booking } });
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Something went wrong. Please try again.';
      }
    });
  }
}