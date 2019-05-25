import { Component, OnInit, Input } from '@angular/core';
import { Medicaments } from '../magazine/Medicaments';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

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

  constructor(private httpMain: MainService, private router: Router, private httpLogin: LoginService) { }

  ngOnInit() {
    if (this.httpLogin.token === '' || this.httpLogin.token === undefined) {
      this.router.navigate(['/login']);
    }
    this.medicaments = new Medicaments();
  }

  addMedicaments() {
    console.log(this.eanCode)
    console.log(this.name)
    console.log(this.isRefunded)
    console.log(this.percentageOfRefund)
    console.log(this.quantity)

    this.medicaments.name = this.name;
    this.medicaments.eanCode = this.eanCode;
    this.medicaments.isRefunded = this.isRefunded;
    this.medicaments.percentageOfRefund = this.percentageOfRefund;
    this.medicaments.quantity = this.quantity;

    this.httpMain.postMedicament(this.medicaments).subscribe(data => {
      console.log(data);
      this.router.navigate(['/magazine']);

    });
  }


}
