import { Login } from '../objects/Login';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() email: String;
  @Input() password: String;
  login: Login;
  token: String;

  constructor(private router: Router, private http: MainService) {
    this.login = new Login();
  }

  ngOnInit() {
    this.token = this.http.token;
  }

  registration() {
    this.router.navigate(['registration']);
  }

  loginFun() {
    this.login.email = this.email;
    this.login.password = this.password;

    this.http.login(this.login).subscribe(data => {
      this.http.token = data.token;
      this.token = data.token;
      if (data.token !== '') {
        this.http.email = this.email;
        this.http.access = data.role;
        this.router.navigate(['home']);
      }
    })

  }
}
