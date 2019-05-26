import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../objects/User';
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

  constructor( private router: Router, private httpMain: MainService) {
    this.userToUpdate = new User();
  }

  ngOnInit() {
    if (this.httpMain.token === '' || this.httpMain.token === undefined) {
      this.router.navigate(['/login']);
    }
    this.getEmployees();
    this.showBox = false;
  }

  registration() {
    this.router.navigate(['registration']);
  }

  getEmployees() {
    this.httpMain.getUsers().subscribe((data) => {
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
