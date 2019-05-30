import { Medicaments } from './../objects/Medicaments';
import { Component, OnInit, Input, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Prescription } from '../objects/Prescription';

@Component({
  selector: 'app-sale-event',
  templateUrl: './sale-event.component.html',
  styleUrls: ['./sale-event.component.css']
})
export class SaleEventComponent implements OnInit {
  listOfMedicaments: Array<Array<any>> = new Array();
  parametr: Boolean;
  //bez recepty
  @Input() eanCodeWR: String;
  @Input() quantityWR: String;
  @Output() listOfAddedMedicamentsWR: Array<Array<any>> = new Array();

  //recepta
  @Input() nrPrescR: String;
  @Input() namePoviderR: String;
  @Input() nrNIPR: String;
  @Input() namePacientR: String;
  @Input() surnamePacientR: String;
  @Input() adresPacientR: String;
  @Input() peselPatientR: String;
  @Input() eanCodeR: String;
  @Input() quantityR: String;
  @Input() nameDoctorR: String;
  @Input() surnameDoctorR: String;
  @Input() specializationDoctorR: String;
  @Input() licenseNumberOfTheDoctorR: String;
  @Input() dateOfFinalizationR: Date;
  @Input() dateOfIssueR: Date;

  @Output() listOfAddedMedicamentsR: Array<Array<any>> = new Array();

  //erecepta
  @Input() peselPacientER: String;
  @Input() verCodeER: String;
  @Output() loadedEPrescription: Prescription;
  @Output() listOfAddedMedicamentsER: Array<Array<any>> = new Array();
  // isSubmited:

  constructor(private http: MainService) {
  }

  ngOnInit() {
  }

  // getMedicamentsList() {
  //   this.http.getMedicaments().subscribe(data => {
  //     console.log(data);
  //     this.listOfMedicaments = data;
  //   });
  // }

  cleanListER(){
    while (this.listOfAddedMedicamentsER.length) {
      this.listOfAddedMedicamentsER.pop();
    }
  }
  
  removeMedFromListER(i) {
    const idx = this.listOfAddedMedicamentsER.indexOf(i);
    if (idx !== -1) {
      return this.listOfAddedMedicamentsER.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
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


  addMedicamentToList() {
    console.log(this.eanCodeR);
    this.http.getMedicament(this.eanCodeR).subscribe(data => {
      console.log(data);
      this.listOfAddedMedicamentsR.push([data, this.quantityR]);
      this.eanCodeR = '';
      this.quantityR = '';
    });
  }

  addMedicamentToListWR() {
    // console.log(this.eanCodeWR);
    // this.listOfAddedMedicamentsWR.push([this.eanCodeWR, this.quantityWR]);
    // this.eanCodeWR = '';
    // this.quantityWR = '';

    console.log(this.eanCodeWR);

    this.http.getMedicamentELeki(this.eanCodeWR).subscribe(data => {
      console.log(data);
      this.listOfAddedMedicamentsWR.push([data, this.quantityWR]);
      this.eanCodeWR = '';
      this.quantityWR = '';
    });
    // this.http.getMedicament(this.eanCodeWR).subscribe(data => {

    // });
  }

  addERecept() {
      this.listOfAddedMedicamentsER.forEach(element => {
        this.http.getMedicamentELeki(element[0]).subscribe(data => {
          
          this.listOfMedicaments.push([data.eanCode, element[1], element[2], element[3], element[4]]);
        });
      });
  }



  addRecept() {

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

    this.listOfAddedMedicamentsR.forEach(element => {
      this.listOfMedicaments.push([element[0], element[1], "R", "", ""]);
    });

  }

  loadEprescription() {
    this.parametr = false;
    this.http.getPrescription(this.peselPacientER, this.verCodeER).subscribe(data => {
      this.loadedEPrescription = data;
      this.loadedEPrescription.elements.forEach(element => {
        if (element.isSubmitted == false) {
          let medElement: Medicaments;
          this.http.getMedicamentELeki(element.eanCode).subscribe(data1 => {
            medElement = data1;
            let obj = [medElement, element.quantity, "ER", this.peselPacientER, this.verCodeER];
            console.log(obj);
            if (this.listOfMedicaments.length > 0) {
              this.listOfMedicaments.forEach(element =>{
                if(element[0] === obj && element[1] === obj[1] && element[2] === obj[2] && element[3] === obj[3] && element[4] === obj[4]){
                  console.log("Already added!!");
                }
                else {
                  console.log("ifek");
                  this.parametr = true;
                }
              });
              if(this.parametr === true)
              {
                this.listOfAddedMedicamentsER.push(obj);
              }
            }
            else {
              console.log("nicniema");
              this.listOfAddedMedicamentsER.push(obj);
            }
          });
        }
        else {
          console.log("SUBMITTED");
          console.log(element.eanCode);
        }
      });
    });
  }

  addWithoutRecept() {
    console.log(this.eanCodeWR);

    this.listOfAddedMedicamentsWR.forEach(element => {
      this.listOfMedicaments.push([element[0], element[1], "WR", "", ""]);
    });

    document.getElementById('closeWR').click();

  }

}
