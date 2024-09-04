import { Booking } from './Booking.model';  // Import the Booking model

export class TaxiOwner {
  taxiOwnerID: number;
  driverName: string;
  carModel: string;
  carNumber: string;
  phone: string;
  bookings: Booking[];

  constructor(
    taxiOwnerID: number,
    driverName: string,
    carModel: string,
    carNumber: string,
    phone: string,
    bookings: Booking[]
  ) {
    this.taxiOwnerID = taxiOwnerID;
    this.driverName = driverName;
    this.carModel = carModel;
    this.carNumber = carNumber;
    this.phone = phone;
    this.bookings = bookings;
  }
}
