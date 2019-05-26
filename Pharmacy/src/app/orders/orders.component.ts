import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../objects/Order';
import { MainService } from '../main.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  listOfOrders: Order[] = [];
  orderToShow: Order;
  showBox: Boolean;


  constructor(private router: Router, private httpMain: MainService) { }

  ngOnInit() {
    this.showBox = false;
    if (this.httpMain.token === '' || this.httpMain.token === undefined) {
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
