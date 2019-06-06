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
import { formatDate } from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    this.http.getUserById(this.orderToShow.pharmacistId).subscribe(data => {
      this.orderToShow.emailPharmacist = data.email;
    })
    // this.http.
  }



  loadMedicaments() {
    if (this.showBox === true) {
      this.medicament = new Medicaments()
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
    console.log(this.listOfMedicaments)
  }

  removeMedFromList(i) {
    const idx = this.listOfMedicaments.indexOf(i);
    if (idx !== -1) {
      return this.listOfMedicaments.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
  }

  createOrder() {
    this.elements.elements = new Array();
    this.listOfMedicaments.forEach( data => {
      this.element = new OrderElement();
      this.element.eanCode = data[0];
      this.element.quantity = data[1];
      this.element.price = data[2];
      if (data[3] == null) {
        this.element.medicament = new Medicaments();
      } else {
        this.element.medicament = data[3];
      }


      this.elements.elements.push(this.element);
    });


    console.log(this.elements)
    this.http.postOrder(this.elements).subscribe(data => {
      console.log(data);
      document.getElementById("closeModal").click();
      this.getOrders();
      while(this.listOfMedicaments.length>0) {
        this.listOfMedicaments.pop()
      }
      this.price = 0;
      this.percentageOfRefund = 0;
      this.isRefunded = false;
      this.nameMedicament = '';
      this.eanCode = '';
      this.showBoxDetails = false;
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



  getOrders() {
    this.http.getOrder().subscribe(data2 => {
      this.listOfOrders = data2;
      this.listOfOrders.forEach(order => {
        order.formattedDateOfIssue = formatDate(order.dateOfIssue, 'd.MM.yyyy, H:mm', 'en-US');
      });
      console.log(data2);
    });
  }




  download() {
    let stringWR = '';
    this.orderToShow.elements.forEach(element => {
      stringWR += 'Nazwa: ' + element.eanCode + ', ilość: ' + element.quantity + '\n';
    });

    var docDefinition = {
      content: [
        { text: 'Zamówienie towaru', style: 'header' },
        '\n\n',
        'Numer dokumentu: ' + this.orderToShow.documentName,
        'Data złożenia: ' + this.orderToShow.formattedDateOfIssue,
        'Zamówienie złożył: ' + this.orderToShow.emailPharmacist,
        'Status zamówienia: ' + this.orderToShow.status,
        '\n\n',
        {text: 'Lista sprzedanych produktów:', style:'italic'},
        stringWR,
      ],

      styles: {
        header: {
          fontSize: 22,
          bold: true,
          italic: true,
        },
      }
    };
    pdfMake.createPdf(docDefinition).download(this.orderToShow.documentName+'.pdf');
}

}
