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
  showBox: Boolean;
  prescriptionDetali: Prescription  = new Prescription();
  constructor(private router: Router, private http: MainService) { }

  ngOnInit() {
    this.showBox = false;
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

  showDetails(i) {
    console.log(i)
    this.showBox = true;
    this.prescriptionDetali = i;
  }
}
