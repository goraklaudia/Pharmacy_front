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
  }

  ngOnInit() {
    if (this.http.token === '' || this.http.token === undefined) {
      this.router.navigate(['/login']);
    }
  }

  // getMedicamentsList() {
  //   this.http.getMedicaments().subscribe(data => {
  //     console.log(data);
  //     this.listOfMedicaments = data;
  //   });
  // }

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
    prescript.elements = [];

    this.listOfAddedMedicamentsR.forEach(element => {
      console.log(element[0])
      this.listOfMedicaments.push([element[0].eanCode, element[0].name, element[1] , 8,"R" , this.nrPrescR, "", prescript]);
    });
    document.getElementById('buttonCancelR').click();
  }

  loadEprescription() {
    // console.log(this.listOfMedicaments);
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
                  // console.log("Already added!!");
                  this.parametr = false;
                }
                else {
                  // console.log("Not added!!");
                }
              });

              if(this.parametr === true)
              {
                this.listOfAddedMedicamentsER.push(obj);
              }
              else{
                // console.log("parametr=false");
              }
            }
            else {
              // console.log("nicniema");
              this.listOfAddedMedicamentsER.push(obj);
            }
          });
        }
        else {
          // console.log("SUBMITTED");
          // console.log(element.eanCode);
        }
      });


    });
    document.getElementById("loadEpresBtn").setAttribute("disabled", '');
  }

  addWithoutRecept() {

    console.log(this.eanCodeWR);
    this.listOfAddedMedicamentsWR.forEach(element => {
      console.log(element)
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





    // this.listOfPrescriptions.forEach(pesVerEle => {
    //   for ( let j = 0; j < this.listOfMedicaments.length; j++) {
    //         if(pesVerEle[0] === this.listOfMedicaments[j][5]) {
    //           let e: PrescriptionElement = new PrescriptionElement;
    //           e.eanCode = this.listOfMedicaments[j][0];
    //           e.quantity = this.listOfMedicaments[j][2];
    //           e.dosage = "dosage";
    //           e.isSubmitted = true;
    //           pesVerEle[1].elements.push(e);
    //         }46
    //       }
    //       console.log("recepta")
    //       console.log(pesVerEle);
    // });

    this.listOfEPrescriptionsData.forEach(pesVerEle => {
      const listOfIndex = new Array();
      let wasInList = false;
      // console.log(pesVerEle[2])
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
            // console.log(pesVerEle[2].elements[i].eanCode);
            // console.log(i);
          }
        }
        // console.log(listOfIndex);
        for ( let i = listOfIndex.length-1; i >= 0 ; --i) {
          const key = listOfIndex[i];
          // console.log("k - " + key );
          pesVerEle[2].elements.splice(key, 1);
        }
        this.saleCompleted.prescriptions.push(pesVerEle[2]);
        console.log(pesVerEle[2]);
    });

    console.log('this.saleCompleted');
    console.log(this.saleCompleted);

    // this.listOfMedicaments.forEach(element => {

    // });
    this.http.postSale(this.saleCompleted).subscribe(data => {

      console.log(data);
      while(this.listOfMedicaments.length) {
        this.listOfMedicaments.pop();
      }
      // this.router.navigate(['sale']);
    });
  }




















  // saveSale() {

  //   this.listOfMedicaments.forEach(element => {
  //     if (element[4] === 'ER') {
  //       if (this.listOfPesVer.length > 0) {
  //         // console.log(this.listOfPesVer);
  //         this.param = false;
  //         this.listOfPesVer.forEach(pesVerEl =>{
  //           if (pesVerEl[0] === element[5] && pesVerEl[1] === element[6]) {
  //             this.param = true;
  //           }
  //         });
  //         if (this.param === false) {
  //           this.listOfPesVer.push([element[5], element[6]]);
  //         }
  //       } else {
  //         this.listOfPesVer.push([element[5], element[6]]);
  //       }
  //     }
  //   });



  //   this.listOfPesVer.forEach(pesVerEle => {
  //     const listOfIndex = new Array();
  //     let wasInList = false;
  //     this.http.getPrescription(pesVerEle[0], pesVerEle[1]).subscribe(eprep => {
  //       console.log(eprep)
  //       for ( let i = 0; i < eprep.elements.length; i++) {
  //         for ( let j = 0; j < this.listOfMedicaments.length; j++) {
  //           // tslint:disable-next-line:max-line-length
  //           if (eprep.elements[i].eanCode === this.listOfMedicaments[j][0] && eprep.elements[i].isSubmitted === false && this.listOfMedicaments[j][5] === pesVerEle[0] && this.listOfMedicaments[j][6] === pesVerEle[1]) {
  //             // console.log('jest ' + eprep.elements[i].eanCode);
  //             wasInList = true;
  //           }
  //         }
  //         console.log(eprep.elements[i].eanCode + ' --- ' + wasInList);
  //         if (wasInList === true) {
  //           console.log('beda submitted ' + eprep.elements[i].eanCode);
  //           listOfIndex.push(i);
  //           wasInList = false;
  //         }
  //       }

  //       for ( let i = 0; i < listOfIndex.length; i++) {
  //         const key = listOfIndex[i];
  //         eprep.elements[key].isSubmitted = true;
  //       }

  //       console.log(eprep);
  //       this.http.postPrescription(eprep).subscribe(res =>{
  //           console.log('res ' + res);
  //           console.log(res);
  //       });

  //       // this.listOfMedicaments.forEach(el => {
  //       //     if (el[5] === pesVerEle[0] && el[6] === pesVerEle[1]) {
  //       //       this.http.getPrescriptionElement(eprep.id, el[0]).subscribe(next =>{
  //       //         eprep.elements.push(next);

  //       //       });
  //       //     }
  //       //   });
  //       // eprep.elements.forEach(el => {

  //       // })

  //         // this.listOfMedicaments.forEach(el => {
  //         //   if (el[5] === pesVerEle[0] && el[6] === pesVerEle[1]){
  //         //     this.http.getPrescriptionElement(eprep.id, el[0]).subscribe(next =>{
  //         //       eprep.elements.push(next);
  //         //       console.log(i + ' ' + next)
  //         //       i++;
  //         //     });
  //         //   }
  //         // });
  //         // console.log("aaa" + eprep);
  //         // this.listOfEprescriptions.push(eprep);
  //         // this.http.postPrescription(eprep).subscribe(res =>{
  //         //   // console.log('res ' + res);
  //         //   // console.log(res);
  //         // });
  //       });
  //   });
  //   // this.saleCompleted.prescriptions = this.listOfEprescriptions;
  //   // console.log('this.saleCompleted.prescriptions')
  //   // console.log(this.saleCompleted.prescriptions);


  //   // --------------------------------------------------------------------------------------------------------------------
  //   // --------------------------------------------------------------------------------------------------------------------


  //   this.listOfMedicaments.forEach(element => {
  //     if (element[4] === 'WR') {
  //       this.medicamentsWithoutPre.eanCode = element[0];
  //       this.medicamentsWithoutPre.quantity = element[2];
  //       this.saleCompleted.medicamentsSoldWithoutPrescription = new Array();
  //       this.saleCompleted.medicamentsSoldWithoutPrescription.push(this.medicamentsWithoutPre);
  //     }
  //   });


  //   // --------------------------------------------------------------------------------------------------------------------
  //   // --------------------------------------------------------------------------------------------------------------------

  //   this.listOfMedicaments.forEach(element => {
  //     if (element[4] === 'R') {
  //       // this.medicamentsWithoutPre.eanCode = element[0];
  //       // this.medicamentsWithoutPre.quantity = element[2];
  //       // this.saleCompleted.medicamentsSoldWithoutPrescription = new Array();
  //       // this.saleCompleted.medicamentsSoldWithoutPrescription.push(this.medicamentsWithoutPre);
  //     }
  //   });
  //   // console.log('this.saleCompleted');
  //   // console.log(this.saleCompleted);


  //   // this.http.postSale(this.saleCompleted).subscribe(data => {

  //   //   console.log(data);
  //   //   while(this.listOfMedicaments.length) {
  //   //     this.listOfMedicaments.pop();
  //   //   }

  //   //   // this.router.navigate(['sale']);
  //   // })
  // }
}



