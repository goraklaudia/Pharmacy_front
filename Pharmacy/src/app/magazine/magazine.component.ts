import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { Medicaments } from '../objects/Medicaments';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent implements OnInit {
  @Input() nameSearch: String;
  listOfMedicaments: Medicaments[] = [];
  tmpListSearch: Medicaments[] = [];
  btnLoadAll: Boolean;
  constructor(private router: Router, private httpMain: MainService) { }

  ngOnInit() {
    if (this.httpMain.token === '' || this.httpMain.token === undefined) {
      this.router.navigate(['/login']);
    }
    this.getMedicamentsList();
    this.btnLoadAll = false;
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

  search() {
    this.btnLoadAll = true;

    this.listOfMedicaments.forEach(element => {
      console.log("tu")
      if (element.name === this.nameSearch) {
        this.tmpListSearch.push(element);
      }
    });
  }

  loadAll() {
    this.btnLoadAll = false;
    while (this.tmpListSearch.length) {
      this.tmpListSearch.pop();
    }
    // this.getMedicamentsList();
  }

}
