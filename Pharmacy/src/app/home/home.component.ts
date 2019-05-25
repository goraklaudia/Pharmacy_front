import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: LoginService) { }

  ngOnInit() {
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

}
