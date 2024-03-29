import { Time } from "@angular/common";
import { OrderElement } from "./OrderElement";
import { User } from './User';

export class Order {
  public id: String;
  public pharmacistId: String;
  public dateOfIssue: Date;
  public dateOfFinalization: Date;
  public documentName: String;
  public status: String;
  public elements: OrderElement[];
  public formattedDateOfIssue: String;
  public emailPharmacist: String;
}
