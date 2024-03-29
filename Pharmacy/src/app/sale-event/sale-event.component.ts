import { Medicaments } from './../objects/Medicaments';
import { Component, OnInit, Input, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Prescription } from '../objects/Prescription';
import { Sale } from '../objects/Sale';
import { MedicamentsWithoutPre } from '../objects/MedicamentsWithoutPre';
import { PrescriptionElement } from '../objects/PrescriptionElement';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { reject } from 'q';
import { element } from 'protractor';

@Component({
  selector: 'app-sale-event',
  templateUrl: './sale-event.component.html',
  styleUrls: ['./sale-event.component.css']
})
export class SaleEventComponent implements OnInit {
  listOfMedicaments: Array<Array<any>> = new Array();
  parametr: Boolean;
  saleCompleted: Sale = new Sale();
  medicamentsWithoutPre: MedicamentsWithoutPre = new MedicamentsWithoutPre();
  medElement: Medicaments;
  prescriptionElementSale: PrescriptionElement = new PrescriptionElement();

//dodawanie sales i prescriptions dla e-prescriptions
  listOfEPrescriptionsData: Array<Array<any>> = new Array();
  listOfPrescriptions: Array<Array<any>> = new Array();
  param: Boolean;
  prescriptionElement: PrescriptionElement = new PrescriptionElement();

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

  constructor(private http: MainService, private router: Router) {
    this.listOfMedicaments = new Array();
  }

  ngOnInit() {
    if (this.http.token === '' || this.http.token === undefined) {
      this.router.navigate(['/login']);
    }
  }


  cleanAllListsAndParams(){
    document.getElementById("loadEpresBtn").removeAttribute("disabled");
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

  removeMedFromListR(i) {
    const idx = this.listOfAddedMedicamentsR.indexOf(i);
    if (idx !== -1) {
      return this.listOfAddedMedicamentsR.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
  }

  removeMedFromList(i) {
    const idx = this.listOfMedicaments.indexOf(i);
    if (idx !== -1) {
      return this.listOfMedicaments.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
  }

  removeMedFromListWR(i) {
    const idx = this.listOfAddedMedicamentsWR.indexOf(i);
    if (idx !== -1) {
      return this.listOfAddedMedicamentsWR.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
  }

  addMedicamentToList() {
    this.http.getMedicament(this.eanCodeR).subscribe(data => {
      this.listOfAddedMedicamentsR.push([data, this.quantityR]);
      this.eanCodeR = '';
      this.quantityR = '';
    });
  }

  addMedicamentToListWR() {

    if(this.eanCodeWR.length < 14) {
      this.eanCodeWR = '0' + this.eanCodeWR;
    }
    this.http.getMedicamentELeki(this.eanCodeWR).subscribe(data => {
      this.listOfAddedMedicamentsWR.push([data, this.quantityWR]);
      this.eanCodeWR = '';
      this.quantityWR = '';
    });

  }

  addERecept() {
      this.listOfAddedMedicamentsER.forEach(element => {
          this.listOfMedicaments.push(element);
      });
      document.getElementById('buttonCancelER').click();
  }



  addRecept() {
    let prescript: Prescription = new Prescription();

    prescript.documentName = this.nrPrescR;
    prescript.nipOrRegonOfTheProvider = this.nrNIPR;
    prescript.provider = this.namePoviderR;
    prescript.nameOfThePatient = this.namePacientR;
    prescript.surnameOfThePatient = this.surnamePacientR;
    prescript.addressOfThePatient = this.adresPacientR;
    prescript.peselNumberOfThePatient = this.peselPatientR;
    prescript.surnameOfTheDoctor = this.surnameDoctorR;
    prescript.specializationOfTheDoctor = this.specializationDoctorR;
    prescript.licenceNumberOfTheDoctor = this.licenseNumberOfTheDoctorR;
    prescript.dateOfIssue = this.dateOfIssueR;
    prescript.dateOfFinalization = this.dateOfFinalizationR;
    prescript.elements = new Array();
    this.listOfAddedMedicamentsR.forEach(element => {
      let pre = new PrescriptionElement();
      pre.eanCode = element[0].eanCode;
      pre.quantity = element[1];
      prescript.elements.push(pre);
    });

    this.listOfAddedMedicamentsR.forEach(element => {
      this.listOfMedicaments.push([element[0].eanCode, element[0].name, element[1] , 8,"R" , this.nrPrescR, "", prescript]);
    });
    document.getElementById('buttonCancelR').click();
  }

  loadEprescription() {
    this.http.getPrescription(this.peselPacientER, this.verCodeER).subscribe(data => {
      this.parametr = true;
      this.loadedEPrescription = data;
      this.loadedEPrescription.elements.forEach(element => {
        if (element.isSubmitted == false) {
          this.http.getMedicamentELeki(element.eanCode).subscribe(dataMed => {
            this.medElement = dataMed;
            let obj = [this.medElement.eanCode, this.medElement.name , element.quantity, 10, "ER", this.peselPacientER, this.verCodeER, data];
            if (this.listOfMedicaments.length > 0) {
              this.parametr = true;
              this.listOfMedicaments.forEach(dana =>{

                if(dana[0] === obj[0]  && dana[4] === obj[4] && dana[5] === obj[5] && dana[6] === obj[6]){
                  this.parametr = false;
                }
                else {
                }
              });

              if(this.parametr === true)
              {
                this.listOfAddedMedicamentsER.push(obj);
              }
              else{
              }
            }
            else {
              this.listOfAddedMedicamentsER.push(obj);
            }
          });
        }
        else {
        }
      });


    });
    document.getElementById("loadEpresBtn").setAttribute("disabled", '');
  }

  addWithoutRecept() {

    this.listOfAddedMedicamentsWR.forEach(element => {
      const random = Math.floor(Math.random() * 20);
      this.listOfMedicaments.push([element[0].eanCode, element[0].name, element[1], random, "WR", "", "",""]);

    });
    document.getElementById('closeWR').click();

  }



  saveSale() {
    this.saleCompleted.medicamentsSoldWithoutPrescription = new Array();
    this.saleCompleted.prescriptions = new Array();

    this.listOfMedicaments.forEach(element => {

      if (element[4] === 'WR') {
        this.medicamentsWithoutPre.eanCode = element[0];
        this.medicamentsWithoutPre.quantity = element[2];
        this.saleCompleted.medicamentsSoldWithoutPrescription.push(this.medicamentsWithoutPre);
      }

      if (element[4] === 'R') {
        if (this.listOfPrescriptions.length > 0) {
          this.param = false;
          this.listOfPrescriptions.forEach(pesVerEl =>{
            if (pesVerEl[0] === element[5]) {
              this.param = true;
            }
          });
          if (this.param === false) {
            this.listOfPrescriptions.push([element[5], element[7]]);
          }
        } else {
          this.listOfPrescriptions.push([element[5], element[7]]);
        }
      }

      if (element[4] === 'ER') {

        if (this.listOfEPrescriptionsData.length > 0) {
          this.param = false;
          this.listOfEPrescriptionsData.forEach(pesVerEl =>{
            if (pesVerEl[0] === element[5] && pesVerEl[1] === element[6]) {
              this.param = true;
            }
          });
          if (this.param === false) {
            this.listOfEPrescriptionsData.push([element[5], element[6], element[7]]);
          }
        } else {
          this.listOfEPrescriptionsData.push([element[5], element[6], element[7]]);
        }
      }
    });

    this.listOfEPrescriptionsData.forEach(pesVerEle => {
      const listOfIndex = new Array();
      let wasInList = false;
        for ( let i = 0; i < pesVerEle[2].elements.length; i++) {
          for ( let j = 0; j < this.listOfMedicaments.length; j++) {
            if (pesVerEle[2].elements[i].eanCode === this.listOfMedicaments[j][0]
              && pesVerEle[2].elements[i].isSubmitted === false
              && pesVerEle[0] === this.listOfMedicaments[j][5]
              && pesVerEle[1] === this.listOfMedicaments[j][6]) {
              wasInList = true;
            }
          }
          if (wasInList === false) {
            listOfIndex.push(i);
          }
          else {
            wasInList = false;
          }
        }
        for ( let i = listOfIndex.length-1; i >= 0 ; --i) {
          const key = listOfIndex[i];
          pesVerEle[2].elements.splice(key, 1);
        }
        this.saleCompleted.prescriptions.push(pesVerEle[2]);
    });

    this.listOfPrescriptions.forEach(pesVerEle => {
      const listOfIndex = new Array();
      let wasInList = false;
        for ( let i = 0; i < pesVerEle[1].elements.length; i++) {
          for ( let j = 0; j < this.listOfMedicaments.length; j++) {
            if (pesVerEle[1].elements[i].eanCode === this.listOfMedicaments[j][0] && pesVerEle[1].documentName === this.listOfMedicaments[j][5] && this.listOfMedicaments[j][4] === 'R') {
              wasInList = true;
            }
          }
          if (wasInList === false) {
            listOfIndex.push(i);
          }
          else {
            wasInList = false;
          }
        }
        for ( let i = listOfIndex.length-1; i >= 0 ; --i) {
          const key = listOfIndex[i];
          pesVerEle[1].elements.splice(key, 1);
        }
        this.saleCompleted.prescriptions.push(pesVerEle[1]);
    });

    this.http.postSale(this.saleCompleted).subscribe(data => {

      while(this.listOfMedicaments.length) {
        this.listOfMedicaments.pop();
      }

      this.listOfEPrescriptionsData.forEach(element => {
        element[2].elements.forEach(element2 => {
          this.prescriptionElementSale = new PrescriptionElement();

          element2.isSubmitted = true;
          this.http.putPrescriptionElement(element2).subscribe(data2 => {
          })
        });

      });
    });
  }

}



