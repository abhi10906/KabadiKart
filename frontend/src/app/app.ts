// import { Component, OnInit } from '@angular/core';
// import { BookingService } from './services/booking.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './app.html',
// })
// export class AppComponent implements OnInit {

//   bookings: any[] = [];
//   loading = false;
//   error = '';
//   successMsg = '';
//   editId: string | null = null;

//   // ── Scrap type categories ──────────────────────────────
//   scrapCategories = [
//     { label: '🔩 Ferrous Metals', options: ['Iron', 'Steel', 'Cast Iron', 'Stainless Steel'] },
//     { label: '🟡 Non-Ferrous Metals', options: ['Copper', 'Aluminium', 'Brass', 'Lead', 'Zinc'] },
//     { label: '📦 Paper & Cardboard', options: ['Newspaper', 'Cardboard', 'White Paper', 'Mixed Paper'] },
//     { label: '🧴 Plastic', options: ['PET Bottles', 'HDPE', 'PVC', 'Mixed Plastic'] },
//     { label: '💻 E-Waste', options: ['Old Mobile', 'Laptop / PC', 'TV / Monitor', 'Wires & Cables', 'Batteries'] },
//     { label: '🪵 Other', options: ['Glass', 'Rubber', 'Wood', 'Mixed Scrap'] },
//   ];

//   // ── Available time slots ───────────────────────────────
//   allTimeSlots = [
//     '08:00 AM – 09:00 AM',
//     '09:00 AM – 10:00 AM',
//     '10:00 AM – 11:00 AM',
//     '11:00 AM – 12:00 PM',
//     '12:00 PM – 01:00 PM',
//     '02:00 PM – 03:00 PM',
//     '03:00 PM – 04:00 PM',
//     '04:00 PM – 05:00 PM',
//     '05:00 PM – 06:00 PM',
//   ];

//   availableSlots: string[] = [];

//   // ── Booking model ──────────────────────────────────────
//   booking = {
//     name: '',
//     phone: '',
//     address: '',
//     scrapType: '',
//     pickupDate: '',
//     timeSlot: '',
//     quantity: '',
//     notes: '',
//   };

//   // ── Min date (today) for date picker ──────────────────
//   get minDate(): string {
//     return new Date().toISOString().split('T')[0];
//   }

//   constructor(private bookingService: BookingService) {}

//   ngOnInit() {
//     this.getBookings();
//   }

//   // Called when user picks a date — filters out past slots for today
//   onDateChange() {
//     this.booking.timeSlot = '';
//     if (!this.booking.pickupDate) {
//       this.availableSlots = [];
//       return;
//     }

//     const selected = new Date(this.booking.pickupDate);
//     const today = new Date();
//     const isToday =
//       selected.getFullYear() === today.getFullYear() &&
//       selected.getMonth() === today.getMonth() &&
//       selected.getDate() === today.getDate();

//     if (isToday) {
//       const currentHour = today.getHours();
//       // Filter slots whose start hour is at least 1 hour from now
//       this.availableSlots = this.allTimeSlots.filter(slot => {
//         const slotHour = parseInt(slot.split(':')[0], 10);
//         const isPM = slot.includes('PM') && slotHour !== 12;
//         const hour24 = isPM ? slotHour + 12 : slotHour === 12 && slot.includes('AM') ? 0 : slotHour;
//         return hour24 > currentHour + 1;
//       });
//     } else {
//       this.availableSlots = [...this.allTimeSlots];
//     }
//   }

//   getBookings() {
//     this.loading = true;
//     this.bookingService.getBookings().subscribe({
//       next: (data: any) => {
//         this.bookings = data;
//         this.loading = false;
//       },
//       error: () => {
//         this.error = 'Failed to fetch bookings';
//         this.loading = false;
//       }
//     });
//   }

//   addBooking() {
//     // Basic phone validation
//     if (!/^\d{10}$/.test(this.booking.phone)) {
//       this.error = 'Please enter a valid 10-digit phone number.';
//       return;
//     }

//     this.loading = true;
//     this.error = '';

//     if (this.editId) {
//       // UPDATE existing booking
      
//       this.bookingService.updateBooking(this.editId, this.booking).subscribe({
//         next: () => {
//           this.showSuccess('Booking updated successfully!');
//           this.resetForm();
//           this.getBookings();
//         },
//         error: () => {
//           this.error = 'Failed to update booking.';
//           this.loading = false;
//         }
//       });
//     } else {
//       // CREATE new booking
//       this.bookingService.addBooking(this.booking).subscribe({
//         next: () => {
//           this.showSuccess('Booking added successfully!');
//           this.resetForm();
//           this.getBookings();
//         },
//         error: () => {
//           this.error = 'Something went wrong!';
//           this.loading = false;
//         }
//       });
//     }
//   }

//   editBooking(b: any) {
//     this.booking = { ...b };
//     this.editId = b._id;
//     this.onDateChange(); // repopulate slots for the loaded date
//     // Scroll to form smoothly
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }

//   cancelEdit() {
//     this.resetForm();
//   }

//   deleteBooking(id: string) {
//     if (!confirm('Are you sure you want to delete this booking?')) return;

//     this.loading = true;
//     this.bookingService.deleteBooking(id).subscribe({
//       next: () => {
//         this.showSuccess('Booking deleted.');
//         this.getBookings();
//       },
//       error: () => {
//         this.error = 'Failed to delete booking';
//         this.loading = false;
//       }
//     });
//   }

//   resetForm() {
//     this.booking = {
//       name: '', phone: '', address: '',
//       scrapType: '', pickupDate: '',
//       timeSlot: '', quantity: '', notes: '',
//     };
//     this.editId = null;
//     this.availableSlots = [];
//     this.loading = false;
//   }

//   showSuccess(msg: string) {
//     this.successMsg = msg;
//     setTimeout(() => (this.successMsg = ''), 3500);
//   }

//   dismissError() {
//     this.error = '';
//   }
// }

// ...new...

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main { min-height: calc(100vh - 64px - 80px); }
  `]
})
export class AppComponent {}