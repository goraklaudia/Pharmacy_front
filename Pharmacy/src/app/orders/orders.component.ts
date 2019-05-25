import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private router: Router, private httpLogin: LoginService) { }

  ngOnInit() {
    if (this.httpLogin.token === '' || this.httpLogin.token === undefined) {
      this.router.navigate(['/login']);
    }
  }

}
