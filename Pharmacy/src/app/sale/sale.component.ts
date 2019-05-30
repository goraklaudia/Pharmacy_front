import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { Sale } from '../objects/Sale';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  listOfSales: Sale[] = [];
  showBox: Boolean;
  showSale: Sale = new Sale();

  constructor(private router: Router, private http: MainService) { }

  ngOnInit() {
    this.showBox = false;
    if (this.http.token === '' || this.http.token === undefined) {
      this.router.navigate(['/login']);
    } else {
      this.getSale();

    }
  }

  moveToAdd() {
    this.router.navigate(['/addsale']);
  }

  getSale() {
    this.http.getSales().subscribe(data => {
      console.log(data);
      this.listOfSales = data;
    })
  }

  showDetails(i) {
    console.log(i)
    this.showBox = true;
    this.showSale = i;
  }
}
