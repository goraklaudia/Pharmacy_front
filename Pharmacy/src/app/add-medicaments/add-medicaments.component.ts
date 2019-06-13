import { Component, OnInit, Input } from '@angular/core';
import { Medicaments } from '../objects/Medicaments';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medicaments',
  templateUrl: './add-medicaments.component.html',
  styleUrls: ['./add-medicaments.component.css']
})
export class AddMedicamentsComponent implements OnInit {
  @Input() name: String;
  @Input() eanCode: String;
  @Input() isRefunded: Boolean;
  @Input() percentageOfRefund: Number;
  @Input() quantity: Number;
  medicaments: Medicaments;

  constructor(private httpMain: MainService, private router: Router) { }

  ngOnInit() {
    if (this.httpMain.token === '' || this.httpMain.token === undefined) {
      this.router.navigate(['/login']);
    }
    this.medicaments = new Medicaments();
  }

  addMedicaments() {
    this.medicaments.name = this.name;
    this.medicaments.eanCode = this.eanCode;
    this.medicaments.isRefunded = this.isRefunded;
    this.medicaments.percentageOfRefund = this.percentageOfRefund;
    this.medicaments.quantity = this.quantity;

    this.httpMain.postMedicament(this.medicaments).subscribe(data => {
      this.router.navigate(['/magazine']);

    });
  }


}
