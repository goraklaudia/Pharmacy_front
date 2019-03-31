import { LoginService } from './login.service';
import { RegisterService } from './../register/register.service';
import { Login } from './Login';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

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

  constructor(private router: Router, private http: LoginService) {
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
      console.log(data);
      this.token = data.token;
      if (data.token != '') {
        this.http.email = this.email;
      }
    })

  }
}
