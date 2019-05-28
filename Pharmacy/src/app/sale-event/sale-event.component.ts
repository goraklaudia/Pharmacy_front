import { Medicaments } from './../objects/Medicaments';
import { Component, OnInit, Input, Output } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-sale-event',
  templateUrl: './sale-event.component.html',
  styleUrls: ['./sale-event.component.css']
})
export class SaleEventComponent implements OnInit {
  listOfMedicaments: Medicaments[] = [];
  //bez recepty
  @Input() eanCodeWR: String;
  @Output() listOfAddedMedicamentsWR: String[] = [];

  //recepta
  @Input() nrPrescR: String;
  @Input() namePoviderR: String;
  @Input() nrNIPR: String;
  @Input() namePacientR: String;
  @Input() surnamePacientR: String;
  @Input() adresPacientR: String;
  @Input() peselPatientR: String;
  @Input() eanCodeR: String;
  @Input() nameDoctorR: String;
  @Input() surnameDoctorR: String;
  @Input() specializationDoctorR: String;
  @Input() licenseNumberOfTheDoctorR:String;
  @Input() dateOfFinalizationR: Date;
  @Input() dateOfIssueR: Date;

  @Output() listOfAddedMedicamentsR: String[] = [];
  // e-recepta
  @Input() peselPacientER: String;
  @Input() verCodeER: String;
  // @Input()
  // @Input()
  // @Input()

  constructor(private http: MainService) { }

  ngOnInit() {
  }

  getMedicamentsList() {
    this.http.getMedicaments().subscribe(data => {
      console.log(data);
      this.listOfMedicaments = data;
    });
  }


  removeMedFromList(i) {
    const idx = this.listOfAddedMedicamentsR.indexOf(i);
    if (idx !== -1) {
      return this.listOfAddedMedicamentsR.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
  }

  removeMedFromListWR(i) {
    const idx = this.listOfAddedMedicamentsWR.indexOf(i);
    if (idx !== -1) {
      return this.listOfAddedMedicamentsWR.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
  }

  addMedicamentToList(){
    console.log(this.eanCodeR);
    this.listOfAddedMedicamentsR.push(this.eanCodeR);
    this.eanCodeR = '';
  }

  addMedicamentToListWR(){
    console.log(this.eanCodeR);
    this.listOfAddedMedicamentsWR.push(this.eanCodeWR);
    this.eanCodeR = '';
  }



  addRecept(){
    // @Input() nrPrescR: String;
    // @Input() namePoviderR: String;
    // @Input() nrNIPR: String;
    // @Input() namePacientR: String;
    // @Input() surnamePacientR: String;
    // @Input() adresPacientR: String;
    // @Input() peselPatientR: String;
    // @Input() eanCodeR: String;
    // @Input() nameDoctorR: String;
    // @Input() surnameDoctorR: String;
    // @Input() specializationDoctorR: String;
    // @Input() licenseNumberOfTheDoctorR:String;
    // @Input() dateOfFinalizationR: Date;
    // @Input() dateOfIssueR: Date;
    console.log(this.nrPrescR)
    console.log(this.namePoviderR)
    console.log(this.nrNIPR)
    console.log(this.namePacientR)
    console.log(this.surnamePacientR)
    console.log(this.adresPacientR)
    console.log(this.peselPatientR)
    console.log(this.eanCodeR)
    console.log(this.nameDoctorR)
    console.log(this.surnameDoctorR)
    console.log(this.specializationDoctorR)
    console.log(this.licenseNumberOfTheDoctorR)
    console.log(this.licenseNumberOfTheDoctorR)
    console.log(this.dateOfFinalizationR)
    console.log(this.dateOfIssueR)
  }

  addErecept() {
    console.log(this.verCodeER);
    console.log(this.peselPacientER);
  }

  addWithoutRecept() {
    console.log(this.eanCodeWR)
  }

}
