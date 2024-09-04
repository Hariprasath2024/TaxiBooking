import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Booking } from '../models/Booking.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  private http = inject(HttpClient);

  dataForm = new FormGroup({
    UserID: new FormControl<number | null>(null),
    TaxiID: new FormControl<number | null>(null),
    CustomerName: new FormControl<string | null>(null),
    DriverName: new FormControl<string | null>(null),
    PickupLocation: new FormControl<string | null>(null),
    DropoffLocation: new FormControl<string | null>(null),
    BookingTime: new FormControl<Date | null>(null),
    Status: new FormControl<string | null>(null)
  });
  
  currentBookingID: number | null = null;
  selectedBooking: Booking | null = null; // Property to store the selected booking details
  Book$: Observable<Booking[]> = this.getBooking();

  private getBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>('https://localhost:7227/api/Bookings');
  }

  updateBooking(bookingID: number) {
    if (this.dataForm.valid) {
      const formData: Booking = this.dataForm.value as Booking;
      console.log('Form Data for Update:', formData);

      this.http.put(`https://localhost:7227/api/Bookings/${bookingID}`, formData).subscribe({
        next: () => {
          console.log('Booking updated successfully');
          this.dataForm.reset();
          this.currentBookingID = null; // Reset the currentBookingID
          this.Book$ = this.getBooking(); // Refresh the list
        },
        error: (error: any) => {
          console.error('Error updating booking:', error);
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    }
  }

  updateBookingStatus(bookingID: number, newStatus: string) {
    if (this.dataForm.valid) {
      const formData: Booking = this.dataForm.value as Booking;
      formData.status = newStatus; // Modify the status
      console.log('Form Data for Status Update:', formData);

      this.http.put(`https://localhost:7227/api/Bookings/${bookingID}`, formData).subscribe({
        next: () => {
          console.log('Booking status updated successfully');
          this.dataForm.reset();
          this.currentBookingID = null; // Reset the currentBookingID
          this.Book$ = this.getBooking(); // Refresh the list
        },
        error: (error: any) => {
          console.error('Error updating booking status:', error);
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    }
  }

  deleteBooking(bookingID: number) {
    this.http.delete(`https://localhost:7227/api/Bookings/${bookingID}`).subscribe({
      next: () => {
        console.log('Booking deleted successfully');
        this.Book$ = this.getBooking(); // Refresh the list
      },
      error: (error: any) => {
        console.error('Error deleting booking:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const formData: Booking = this.dataForm.value as Booking;
      console.log('Form Data:', formData);

      if (this.currentBookingID) {
        this.updateBooking(this.currentBookingID);
      } else {
        this.http.post<Booking>('https://localhost:7227/api/Bookings', formData).subscribe({
          next: (response: Booking) => {
            console.log('Booking created successfully:', response);
            this.dataForm.reset();
            this.Book$ = this.getBooking(); // Refresh the list
          },
          error: (error: any) => {
            console.error('Error creating booking:', error);
          },
          complete: () => {
            console.log('Request completed');
          }
        });
      }
    }
  }

  editBooking(booking: Booking) {
    this.currentBookingID = booking.bookingID;
    this.dataForm.setValue({
      UserID: booking.userID,
      TaxiID: booking.taxiID,
      CustomerName: booking.customerName,
      DriverName: booking.driverName,
      PickupLocation: booking.pickupLocation,
      DropoffLocation: booking.dropoffLocation,
      BookingTime: booking.bookingTime,
      Status: booking.status
    });
  }

  viewDetails(booking: Booking) {
    this.selectedBooking = booking; // Set the selected booking details
    // Optionally, you can trigger a modal or navigate to a detailed view page here
  }

  confirmDelete(bookingID: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.deleteBooking(bookingID);
    }
  }

  trackByFn(index: number, item: any): number {
    return item.bookingID;
  }
}
