import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HttpParams} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MagazineComponent } from './magazine/magazine.component';
import { EmployeesComponent } from './employees/employees.component';
import { SaleComponent } from './sale/sale.component';
import { OrdersComponent } from './orders/orders.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { AddMedicamentsComponent } from './add-medicaments/add-medicaments.component';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { SaleEventComponent } from './sale-event/sale-event.component';

@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MagazineComponent,
    EmployeesComponent,
    SaleComponent,
    OrdersComponent,
    PrescriptionComponent,
    AddMedicamentsComponent,
    AddSaleComponent,
    SaleEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
