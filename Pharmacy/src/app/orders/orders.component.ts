import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Order } from './Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  listOfOrders: Order[] = [];
  orderToShow: Order;
  showBox: Boolean;


  constructor(private router: Router, private httpLogin: LoginService) { }

  ngOnInit() {
    this.showBox = false;
    if (this.httpLogin.token === '' || this.httpLogin.token === undefined) {
      this.router.navigate(['/login']);
    }
  }

  reciveedOrder(i: Order) {
    console.log(i);
  }

  showDetails(i: Order) {
    console.log(i);
    this.showBox = true;
    this.orderToShow = i;
  }
}
