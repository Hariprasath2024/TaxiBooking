export class Booking {
      bookingID: number;
      userID: number;
      taxiID: number;
      customerName: string;
      driverName: string;
      pickupLocation: string;
      dropoffLocation: string;
      bookingTime: Date;
      status: string;
    
      constructor(
        bookingID: number,
        userID: number,
        taxiID: number,
        customerName: string,
        driverName: string,
        pickupLocation: string,
        dropoffLocation: string,
        bookingTime: Date,
        status: string
      ) {
        this.bookingID = bookingID;
        this.userID = userID;
        this.taxiID = taxiID;
        this.customerName = customerName;
        this.driverName = driverName;
        this.pickupLocation = pickupLocation;
        this.dropoffLocation = dropoffLocation;
        this.bookingTime = bookingTime;
        this.status = status;
      }
    }
    