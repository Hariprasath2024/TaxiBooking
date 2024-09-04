import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { BookingComponent } from './booking/booking.component';
import { TaxiOwnerComponent } from './taxi-owner/taxi-owner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TaxiOwnerComponent,CustomerComponent,BookingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Taxi Booking System';
}
