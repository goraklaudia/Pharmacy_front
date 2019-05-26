import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { Medicaments } from '../objects/Medicaments';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent implements OnInit {

  listOfMedicaments: Medicaments[] = []
  constructor(private router: Router, private httpMain: MainService) { }

  ngOnInit() {
    if (this.httpMain.token === '' || this.httpMain.token === undefined) {
      this.router.navigate(['/login']);
    }
    this.getMedicamentsList();
  }

  getMedicamentsList() {
    this.httpMain.getMedicaments().subscribe(data => {
      console.log(data);
      this.listOfMedicaments = data;
    });
  }

  gotToAdd(){
    this.router.navigate(['/addmedicaments']);
  }

}
