import { User } from './User';
import { Prescription } from './Prescription';
import { MedicamentsWithoutPre } from './MedicamentsWithoutPre';

export class Sale {
  public id: Number;
  // public pharmacistId: String;
  // public pharmacist: User;
  // public dateOfIssue: Date;
  // public prescriptions: Prescription;
  // public medicamentsSoldWithoutPrescription: MedicamentsWithoutPre[];
  public documentName: String;
  public prescriptions: Prescription[];
  public medicamentsSoldWithoutPrescription: MedicamentsWithoutPre[];
}


// {
//   "prescriptions": [],
//   "medicamentsSoldWithoutPrescription": [
//   {
//     "eanCode": "1234567890124",
// 		"quantity": 3
//   }
// ]
// }
