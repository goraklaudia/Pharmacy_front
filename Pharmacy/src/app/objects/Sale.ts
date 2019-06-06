import { User } from './User';
import { Prescription } from './Prescription';
import { MedicamentsWithoutPre } from './MedicamentsWithoutPre';

export class Sale {
  public id: Number;
  public documentName: String;
  public pharmacistId: String;
  public pharmacist: User;
  public dateOfIssue: Date;
  public prescriptions: Prescription[];
  public medicamentsSoldWithoutPrescription: MedicamentsWithoutPre[];

  public formattedDateOfIssue: String;
  public emailPharmacist: String;
}
