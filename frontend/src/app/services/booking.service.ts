import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  _id?: string;
  name: string;
  phone: string;
  address: string;
  scrapType: string;
  pickupDate: string;
  timeSlot: string;
  quantity: string;
  notes?: string;
  status?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private api = 'https://kabadikart.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.api);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.api, booking);
  }

  updateBooking(id: string, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.api}/${id}`, booking);
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}