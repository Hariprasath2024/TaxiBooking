import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { CustomerComponent } from './customer/customer.component';
import { TaxiOwnerComponent } from './taxi-owner/taxi-owner.component';

export const routes: Routes = [
    {path:'',component:BookingComponent},
    {path:'customer',component:CustomerComponent},
    {path:'taxiowner',component:TaxiOwnerComponent},
    { path: '', redirectTo: '/booking', pathMatch: 'full' }
];
