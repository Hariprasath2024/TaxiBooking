import { Component, inject } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaxiOwner } from '../models/TaxiOwner.model';
import {Booking} from '../models/Booking.model'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-taxi-owner',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './taxi-owner.component.html',
  styleUrls: ['./taxi-owner.component.css']
})
export class TaxiOwnerComponent {
  private http = inject(HttpClient);
  taxiOwnerForm = new FormGroup({
    taxiOwnerID: new FormControl<number | null>(null),
    driverName: new FormControl<string | null>(null),
    carModel: new FormControl<string | null>(null),
    carNumber: new FormControl<string | null>(null),
    phone: new FormControl<string | null>(null),
    bookings: new FormControl<Booking[]>([])
  });

  TaxiOwner$: Observable<TaxiOwner[]> = this.getTaxiOwner();

  private getTaxiOwner(): Observable<TaxiOwner[]> {
    return this.http.get<TaxiOwner[]>('https://localhost:7227/api/TaxiOwner');
  }

  onSubmit() {
    if (this.taxiOwnerForm.valid) {
      const formData: TaxiOwner = this.taxiOwnerForm.value as TaxiOwner;
      console.log('Form Data:', formData);

      this.http.post<TaxiOwner>('https://localhost:7227/api/TaxiOwner', formData).subscribe({
        next: (response: TaxiOwner) => {
          console.log('TaxiOwner created successfully:', response);
        },
        error: (error: any) => {
          console.error('Error creating TaxiOwner:', error);
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    }
  }
  trackByFn(index: number, item: any): number {
    return item.taxiOwnerID // Use the unique identifier for Customer
  }
}
