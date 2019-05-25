import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(private router: Router, private httpLogin: LoginService) { }

  ngOnInit() {
    if (this.httpLogin.token === '' || this.httpLogin.token === undefined) {
      this.router.navigate(['/login']);
    }
  }

}
