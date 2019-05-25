import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  constructor(private router: Router, private httpLogin: LoginService) { }

  ngOnInit() {
    if (this.httpLogin.token === '' || this.httpLogin.token === undefined) {
      this.router.navigate(['/login']);
    }
  }

}
