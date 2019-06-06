import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { Sale } from '../objects/Sale';
import {formatDate} from "@angular/common";
import * as jsPDF from 'jspdf';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  listOfSales: Sale[] = [];
  showBox: Boolean;
  showSale: Sale = new Sale();

  constructor(private router: Router, private http: MainService) { }

  ngOnInit() {
    this.showBox = false;
    if (this.http.token === '' || this.http.token === undefined) {
      this.router.navigate(['/login']);
    } else {
      this.getSale();

    }
  }

  moveToAdd() {
    this.router.navigate(['/addsale']);
  }

  getSale() {
    this.http.getSales().subscribe(data => {
      console.log(data);
      this.listOfSales = data;
      this.listOfSales.forEach(sale => {
        sale.formattedDateOfIssue = formatDate(sale.dateOfIssue, 'd.MM.yyyy, H:mm', 'en-US');
      });
    })
  }

  showDetails(i) {
    console.log(i)
    this.showBox = true;
    this.showSale = i;
    this.http.getUserById(this.showSale.pharmacistId).subscribe(data => {
      this.showSale.emailPharmacist = data.email;
    })
  }

  download() {
    let stringWR = '';
    let stringR = '';
    this.showSale.medicamentsSoldWithoutPrescription.forEach(element => {
      stringWR += 'Nazwa: ' + element.eanCode + ', ilość: ' + element.quantity + '\n';
    });

      this.showSale.prescriptions.forEach(element => {
        element.elements.forEach(medic => {
          stringR += 'Nazwa: ' + medic.eanCode + ', ilość: ' + medic.quantity + '\n';
        });
      });

    var docDefinition = {
      content: [
        { text: 'Dokument sprzedaży', style: 'header' },
        '\n\n',
        'Numer dokumentu: ' + this.showSale.documentName,
        'Data złożenia: ' + this.showSale.formattedDateOfIssue,
        'Sprzedaż dokonał: ' + this.showSale.emailPharmacist,
        '\n\n',
        {text: 'Lista sprzedanych produktów:', style:'italic'},
        stringR,
        stringWR,
      ],

      styles: {
        header: {
          fontSize: 22,
          bold: true,
          italic: true,
        },
      }
    };
    pdfMake.createPdf(docDefinition).download(this.showSale.documentName+'.pdf');
}
}
