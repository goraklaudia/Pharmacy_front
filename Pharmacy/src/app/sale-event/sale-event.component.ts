import { Medicaments } from './../objects/Medicaments';
import { Component, OnInit, Input, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Prescription } from '../objects/Prescription';
import { Sale } from '../objects/Sale';

@Component({
  selector: 'app-sale-event',
  templateUrl: './sale-event.component.html',
  styleUrls: ['./sale-event.component.css']
})
export class SaleEventComponent implements OnInit {
  listOfMedicaments: Array<Array<any>> = new Array();
  parametr: Boolean;
  saleCompleated: Sale = new Sale();
  medElement: Medicaments;
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

  cleanAllListsAndParams(){
    this.peselPacientER = '';
    this.verCodeER = '';
    this.parametr = false;
    this.medElement = null;
    this.eanCodeWR = '';
    this.quantityWR = '';
    this.nrPrescR = '';
    this.namePoviderR = '';
    this.nrNIPR = '';
    this.namePacientR = '';
    this.surnamePacientR = '';
    this.adresPacientR = '';
    this.peselPatientR = '';
    this.eanCodeR = '';
    this.quantityR = '';
    this.nameDoctorR = '';
    this.surnameDoctorR = '';
    this.specializationDoctorR = '';
    this.licenseNumberOfTheDoctorR = '';
    this.dateOfFinalizationR = null;
    this.dateOfIssueR = null;
    this.loadedEPrescription = null;
   
    while (this.listOfAddedMedicamentsER.length) {
      this.listOfAddedMedicamentsER.pop();
    }
    while (this.listOfAddedMedicamentsR.length) {
      this.listOfAddedMedicamentsR.pop();
    }
    while (this.listOfAddedMedicamentsWR.length) {
      this.listOfAddedMedicamentsWR.pop();
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
    console.log(this.eanCodeWR);

    this.http.getMedicamentELeki(this.eanCodeWR).subscribe(data => {
      console.log(data);
      this.listOfAddedMedicamentsWR.push([data, this.quantityWR]);
      this.eanCodeWR = '';
      this.quantityWR = '';
    });

  }

  addERecept() {
      this.listOfAddedMedicamentsER.forEach(element => {
          this.listOfMedicaments.push(element);
      });
  }



  addRecept() {
    this.listOfAddedMedicamentsR.forEach(element => {
      this.listOfMedicaments.push([element[0], element[1], "R", "", ""]);
    });
  }

  loadEprescription() {
    console.log(this.listOfMedicaments);
    this.http.getPrescription(this.peselPacientER, this.verCodeER).subscribe(data => {
      this.parametr = true;
      this.loadedEPrescription = data;
      this.loadedEPrescription.elements.forEach(element => {
        if (element.isSubmitted == false) {
          this.http.getMedicamentELeki(element.eanCode).subscribe(dataMed => {
            this.medElement = dataMed;
            let obj = [this.medElement.eanCode, this.medElement.name , element.quantity, 10, "ER", this.peselPacientER, this.verCodeER];
            if (this.listOfMedicaments.length > 0) {
              this.parametr = true;
              
              
              this.listOfMedicaments.forEach(dana =>{
                
                if(dana[0] === obj[0]  && dana[4] === obj[4] && dana[5] === obj[5] && dana[6] === obj[6]){
                  console.log("Already added!!");
                  this.parametr = false;
                }
                else {
                  console.log("Not added!!");
                }
              });
              
              if(this.parametr === true)
              {
                this.listOfAddedMedicamentsER.push(obj);
              }
              else{
                console.log("parametr=false");
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
      console.log(element)
      const random = Math.floor(Math.random() * 20);
      this.listOfMedicaments.push([element[0].eanCode, element[0].name, element[1], random, "WR", "", ""]);

    });
    document.getElementById('closeWR').click();

  }

  saveSale() {
    this.listOfMedicaments.forEach(element => {

    });
  }
}



