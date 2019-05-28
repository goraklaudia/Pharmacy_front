import { Medicaments } from './../objects/Medicaments';
import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-sale-event',
  templateUrl: './sale-event.component.html',
  styleUrls: ['./sale-event.component.css']
})
export class SaleEventComponent implements OnInit {
  listOfMedicaments: Medicaments[] = [];
  @Input() eanCodeWR: Number;

  constructor(private http: MainService) { }

  ngOnInit() {
  }

  getMedicamentsList() {
    this.http.getMedicaments().subscribe(data => {
      console.log(data);
      this.listOfMedicaments = data;
    });
  }




}
