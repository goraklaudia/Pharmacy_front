import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private http: MainService, private router: Router) { }

  ngOnInit() {
    console.log(this.http.token)
  }

  logout() {
    console.log('wylogowano');
    this.http.token = '';
    this.router.navigate(['/home']);
  }

  checkIfIsLog() {
    if (this.http.token === '' || this.http.token === undefined || this.http.token === null) {
      return false;
    } else {
      return true;
    }
  }


}
