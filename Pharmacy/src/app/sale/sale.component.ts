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

  constructor(private router: Router, private http: MainService) { }

  ngOnInit() {
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
}
