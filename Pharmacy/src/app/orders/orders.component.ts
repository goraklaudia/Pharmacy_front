import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../objects/Order';
import { MainService } from '../main.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  listOfOrders: Order;
  listOfMedicaments: Array<Array<any>> = Array()
  orderToShow: Order;
  showBox: Boolean;
  @Input() quantity:String;
  @Input() eanCode:String;


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

  loadMedicaments() {
    this.listOfMedicaments.push([this.eanCode, this.quantity]);
  }

  removeMedFromList(i){
    const idx = this.listOfMedicaments.indexOf(i);
    if (idx !== -1) {
      return this.listOfMedicaments.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
  }

  createOrder() {

  }
}
