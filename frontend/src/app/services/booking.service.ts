import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  // ✅ GET all bookings
  getBookings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // ✅ ADD booking
  addBooking(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateBooking(id: string, booking: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, booking);
  }

  // ✅ DELETE booking
  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}