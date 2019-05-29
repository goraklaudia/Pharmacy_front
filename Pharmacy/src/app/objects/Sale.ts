import { User } from './User';
import { Prescription } from './Prescription';
import { MedicamentsWithoutPre } from './MedicamentsWithoutPre';

export class Sale {
  public id: Number;
  public pharmacistId: String;
  public pharmacist: User;
  public dateOfIssue: Date;
  public prescriptions: Prescription;
  public medicamentsSoldWithoutPrescription: MedicamentsWithoutPre[];
}
