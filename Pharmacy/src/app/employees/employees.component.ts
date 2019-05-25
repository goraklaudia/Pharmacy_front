import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';
import { User } from '../register/User';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  listOfUsers: User[] = [];
  showBox: Boolean;
  showPassword: String;
  showEmail: String;
  showSurName: String;
  showName: String;

  constructor( private router: Router, private http: RegisterService) { }

  ngOnInit() {
    this.getEmployees();
    this.showBox = false;
  }

  registration() {
    this.router.navigate(['registration']);
  }

  getEmployees() {
    this.http.getUsers().subscribe((data) => {
      this.listOfUsers = data;

      console.log( this.listOfUsers );
    });
  }

  showDetails(i: User) {
    this.showBox = true;
    this.showPassword = i.password;
    this.showEmail = i.email;
    this.showSurName = i.fullName;
    this.showName = i.username;
  }
}
