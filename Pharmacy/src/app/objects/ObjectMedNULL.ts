import { Time } from "@angular/common";
import { OrderElement } from "./OrderElement";
import { User } from './User';
import { OrderElementMedNULL } from './OrderElementMedNULL';

export class ObjectMedNULL {
  public id: String;
  public pharmacistId: String;
  public dateOfIssue: Date;
  public dateOfFinalization: Date;
  public documentName: String;
  public status: String;
  public elements: OrderElementMedNULL[];
  public formattedDateOfIssue: String;
  public emailPharmacist: String;
}
