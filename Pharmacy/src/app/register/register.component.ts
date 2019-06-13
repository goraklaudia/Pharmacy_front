import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../objects/User';
import { MainService } from '../main.service';

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
  @Input() education: String;
  user: User;



  constructor(private router: Router, private http: MainService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  addUser() {
    this.user.email = this.email;
    this.user.username = this.firstName;
    this.user.fullName = this.lastName;
    this.user.password = this.password;
    this.user.role = this.role;
    this.user.education = this.education;
    this.postUser(this.user);
  }

  postUser( user ) {
    this.http.register(user).subscribe(data => {
      this.router.navigate(['employees']);
      // if(data )
    });
  }
}
