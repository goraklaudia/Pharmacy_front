import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../objects/Order';
import { MainService } from '../main.service';
import { ElementSale } from '../objects/ElementSale';
import { ElementJSONSale } from '../objects/ElementJSONSale';
import { OrderElement } from '../objects/OrderElement';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  // listOfOrders: Order;
  listOfMedicaments: Array<Array<any>> = new Array();
  orderToShow: Order;
  showBox: Boolean;
  element: ElementSale;
  elements: ElementJSONSale;
  listOfOrders: Array<Order> = new Array();
  @Input() quantity: String;
  @Input() eanCode: String;
  @Input() price: String;


  constructor(private router: Router, private http: MainService) {
    this.element = new ElementSale();
    this.elements = new ElementJSONSale();
  }

  ngOnInit() {
    this.showBox = false;
    if (this.http.token === '' || this.http.token === undefined) {
      this.router.navigate(['/login']);
    } else {
      this.getOrders();
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
    this.listOfMedicaments.push([this.eanCode, this.quantity, this.price]);
  }

  removeMedFromList(i) {
    const idx = this.listOfMedicaments.indexOf(i);
    if (idx !== -1) {
      return this.listOfMedicaments.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
  }

  createOrder() {
    this.listOfMedicaments.forEach( element => {
      this.element.eanCode = element[0];
      this.element.quantity = element[1];
      this.element.price = element[2];
      this.elements.elements = new Array();
      this.elements.elements.push(this.element);
    });

    console.log(this.elements)
    this.http.postOrder(this.elements).subscribe(data => {
      console.log(data);
      this.getOrders();
    }, error => {
      console.log(error)
    });

  }

//   {
//     "elements": [
//         {
//             "eanCode": "00191778013054",
//             "medicament": {
//                 "name": "Invanz",
//                 "eanCode": "00191778013054",
//                 "isRefunded": true,
//                 "percentageOfRefund": 5,
//                 "sellingPrice": 30,
//                 "quantity": 0,
//                 "comment": "string"
//             },
//             "quantity": 25,
//             "price": 10
//         }
//     ]
// }

  getOrders() {
    this.http.getOrder().subscribe(data2 => {
      this.listOfOrders = data2;
      console.log(data2);
    });
  }
}
