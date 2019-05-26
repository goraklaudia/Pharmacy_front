import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MagazineComponent } from './magazine/magazine.component';
import { EmployeesComponent } from './employees/employees.component';
import { OrdersComponent } from './orders/orders.component';
import { SaleComponent } from './sale/sale.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { AddMedicamentsComponent } from './add-medicaments/add-medicaments.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'magazine', component: MagazineComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'prescription', component: PrescriptionComponent },
  { path: 'addmedicaments', component: AddMedicamentsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
