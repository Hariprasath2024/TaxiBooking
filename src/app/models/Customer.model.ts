import { Booking } from './Booking.model';  // Make sure you import the Booking model

export class Customer {
  customerID: number;
  name: string;
  email: string;
  phone: string;
 bookings?: Booking[];

  constructor(
    customerID: number,
    name: string,
    email: string,
    phone: string,
    bookings: Booking[]
  ) {
    this.customerID = customerID;
    this.name = name;
    this.email = email;
    this.phone = phone;
     this.bookings = bookings;
  }
}
