import { RegisterService } from './register.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() role: String;
  @Input() password: String;
  @Input() lastName: String;
  @Input() firstName: String;
  @Input() email: String;
  user: User;


  constructor(private router: Router, private http: RegisterService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  addUser(email, name, surname, password, role) {
    console.log(email);
    this.user.email = this.email;
    this.user.username = this.firstName;
    this.user.fullname = this.lastName;
    this.user.password = this.password;
    this.user.role = this.role;

    this.postUser(this.user);
  }

  postUser( user ) {
    this.http.register(user).subscribe(data => {
      console.log(data);
    });
  }
}
