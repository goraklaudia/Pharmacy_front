import { Time } from "@angular/common";
import { OrderElement } from "./OrderElement";

export class Order {
  public id: String;
  public pharmacistId: String;
  public dateOfIssue: Date;
  public dateOfFinalization: Date;
  public status: String;
  public listOfOrderElements: OrderElement[];

}
