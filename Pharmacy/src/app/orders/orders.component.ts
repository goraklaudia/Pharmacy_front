import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../objects/Order';
import { MainService } from '../main.service';
import { ElementSale } from '../objects/ElementSale';
import { ElementJSONSale } from '../objects/ElementJSONSale';
import { OrderElement } from '../objects/OrderElement';
import { HttpHeaders } from '@angular/common/http';
import { Medicaments } from '../objects/Medicaments';
import { User } from '../objects/User';

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
  element: OrderElement;
  elements: ElementJSONSale;
  medicament: Medicaments = new Medicaments()
  listOfOrders: Array<Order> = new Array();
  showBoxDetails: Boolean;
  @Input() quantity: Number;
  @Input() eanCode: String;
  @Input() price: Number;
  @Input() percentageOfRefund: Number;
  @Input() isRefunded: Boolean;
  @Input() nameMedicament: String;
  @Output() msg: String;
  pharmacistOrder: User;


  constructor(private router: Router, private http: MainService) {
    this.element = new OrderElement();
    this.elements = new ElementJSONSale();
  }

  ngOnInit() {
    this.showBox = false;
    this.showBoxDetails = false;
    if (this.http.token === '' || this.http.token === undefined) {
      this.router.navigate(['/login']);
    } else {
      this.getOrders();
    }

  }

  cancelOrder(i: Order) {
    console.log(i);
    console.log(i.id)
    this.http.deleteOrder(i.id).subscribe(data => {
      console.log(data);
      this.getOrders();
    });
  }

  completedOrder() {
    console.log(this.orderToShow);
    this.orderToShow.status = 'completed';
    this.http.putOrder(this.orderToShow).subscribe(data => {
      console.log(data)
    });
  }

  showDetails(i: Order) {
    console.log(i);
    this.showBoxDetails = true;
    this.orderToShow = i;
    // this.http.
  }



  loadMedicaments() {
    if (this.showBox === true) {
      this.medicament.eanCode = this.eanCode;
      this.medicament.name = this.nameMedicament;
      this.medicament.isRefunded = this.isRefunded;
      this.medicament.percentageOfRefund = this.percentageOfRefund;
      this.medicament.sellingPrice = this.price;
      this.medicament.quantity = 0;
    } else {
      this.medicament = new Medicaments()
    }
    this.listOfMedicaments.push([this.eanCode, this.quantity, this.price, this.medicament]);
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
      this.element.medicament = element[3];
      this.elements.elements = new Array();
      this.elements.elements.push(this.element);
    });

    console.log(this.elements)
    this.http.postOrder(this.elements).subscribe(data => {
      console.log(data);
      this.getOrders();
    }, error => {
      console.log(error.statusText)
      if (error.statusText === 'Bad Request') {

      }
    });

  }

  checkIfIsInMagazine() {
    this.http.getMedicament(this.eanCode).subscribe(data => {
      console.log(data)
      if (data === null) {
        this.msg = 'Nie ma takiego leku w bazie dodaj pozostałe elementy';
        this.showBox = true;
      } else {
        this.msg = '';
        this.showBox = false;
      }
    })
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
