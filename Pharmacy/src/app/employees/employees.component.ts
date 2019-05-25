import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';
import { User } from '../register/User';
import { LoginService } from '../login/login.service';
import { MainService } from '../main.service';

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
  userToUpdate: User;

  constructor( private router: Router, private http: RegisterService, private httpLogin: LoginService, private httpMain: MainService) {
    this.userToUpdate = new User();
  }

  ngOnInit() {
    if (this.httpLogin.token === '' || this.httpLogin.token === undefined) {
      this.router.navigate(['/login']);
    }
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


    this.userToUpdate = i;
    this.userToUpdate.isActive = true;
  }

  deactivateUser() {
    console.log(this.userToUpdate)
    this.httpMain.putUser(this.userToUpdate).subscribe(data => {
      console.log(data);
      this.getEmployees();
    });
  }
}
