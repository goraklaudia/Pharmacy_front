import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { Prescription } from '../objects/Prescription';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  listOfPrescription: Prescription[] = [];
  constructor(private router: Router, private http: MainService) { }

  ngOnInit() {
    if (this.http.token === '' || this.http.token === undefined) {
      this.router.navigate(['/login']);
    } else {
      this.getPrescriptions();
    }
  }

  getPrescriptions() {
    this.http.getPrescriptions().subscribe(data => {
      console.log(data);
      this.listOfPrescription = data;
    })
  }

}
