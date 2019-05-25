import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private http: LoginService, private router: Router) { }

  ngOnInit() {
    console.log(this.http.token)
    if (this.http.token === '' || this.http.token === undefined || this.http.token === null) {
      document.getElementById('loginBtn').style.display = 'block';
      document.getElementById('logoutBtn').style.display = 'none';
      console.log('tu')
    } else {
      document.getElementById('logoutBtn').style.display = 'block';
      document.getElementById('loginBtn').style.display = 'none';
      console.log('tu 2')
    }
  }

  logout() {
    console.log('wyllogowano')
    this.http.token = '';
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'none';
    this.router.navigate(['/home']);
  }

}
