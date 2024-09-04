import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../models/Customer.model';
import {Booking} from '../models/Booking.model'
import { Observable,map } from 'rxjs';
@Component({
  selector: 'app-customer',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  private http = inject(HttpClient);

  customerForm = new FormGroup({
    customerID: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string | null>(null),
    bookings: new FormControl<Booking[]>([]) // Initialize as an empty array if needed
  });
  Customer$: Observable<Customer[]> = this.getCustomer();
  private getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>('https://localhost:7227/api/Customer').pipe(
      map(response => response as Customer[])
    );
  }
  onSubmit() {
    if (this.customerForm.valid) {
      const formData: Customer = this.customerForm.value as Customer;
      console.log('Form Data:', formData);

      this.http.post<Customer>('https://localhost:7227/api/Customer', formData).subscribe({
        next: (response: Customer) => {
          console.log('Customer created successfully:', response);
          // Handle success, maybe reset the form or navigate
        },
        error: (error: any) => {
          console.error('Error creating Customer:', error);
          // Handle error
        },
        complete: () => {
          console.log('Request completed');
          // Handle the completion of the observable if needed
        }
      });
    }
  }
  trackByFn(index: number, item: any): number {
    return item.customerID; // Use the unique identifier for Customer
  }
}