import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { Prescription } from '../objects/Prescription';
import { formatDate } from "@angular/common";

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
      this.listOfPrescription = data;
      this.listOfPrescription.forEach(prescription => {
        prescription.formattedDateOfIssue = formatDate(prescription.dateOfIssue, 'd.MM.yyyy, H:mm', 'en-US');
      });
    })
  }

  showDetails(i) {
    this.showBox = true;
    this.prescriptionDetali = i;
  }
}
