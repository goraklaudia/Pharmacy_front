import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Medicaments } from './objects//Medicaments';
import { User } from './objects/User';
import { Login } from './objects/Login';
import { Confirm } from './objects/Confirm';
import { Prescription } from './objects/Prescription';
import { Sale } from './objects/Sale';
import { ElementSale } from './objects/ElementSale';
import { ElementJSONSale } from './objects/ElementJSONSale';
import { Order } from './objects/Order';
import { PrescriptionElement } from './objects/PrescriptionElement';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  email: String;
  token: String;
  access: String;

  constructor(private http: HttpClient) { }

  getSale(): Observable<Sale> {
    return this.http.get<Sale>('https://pharmacy.azurewebsites.net/api/Sales');
  }

  postSale(sales: Sale): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    console.log(header);
    return this.http.post<String>('https://pharmacy.azurewebsites.net/api/Sales', sales,  {headers: header})

  }

  postOrder(elements: ElementJSONSale): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    console.log(header);
    return this.http.post<String>('https://pharmacy.azurewebsites.net/api/Orders', elements,  {headers: header})
  }

  putOrder(elements: Order): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    console.log(header);
    return this.http.put<String>('https://pharmacy.azurewebsites.net/api/Orders/' + elements.id, elements,  {headers: header})
  }

  deleteOrder(elements: String): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    console.log(header);
    return this.http.delete<String>('https://pharmacy.azurewebsites.net/api/Orders/' + elements, {headers: header})
  }


  getOrder(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>('https://pharmacy.azurewebsites.net/api/Orders');
  }

  getPrescription(peselPacientER: String, verCodeER: String): Observable<Prescription> {
    return this.http.get<Prescription>('https://e-recepta.azurewebsites.net/api/prescriptions/' + peselPacientER + '?code=' + verCodeER);
  }

  getPrescriptionElement(prescriptionId: String, eanCode: String): Observable<PrescriptionElement> {
    return this.http.get<PrescriptionElement>('https://e-recepta.azurewebsites.net/api/prescriptionElements/' + prescriptionId + '/' + eanCode);
  }
 
  getMedicaments(): Observable<Array<Medicaments>> {
    return this.http.get<Array<Medicaments>>('https://pharmacy.azurewebsites.net/api/Medicaments');
  }

  getMedicament(eanCode: String): Observable<Medicaments> {

    return this.http.get<Medicaments>('https://pharmacy.azurewebsites.net/api/Medicaments/' + eanCode);
  }

  getMedicamentELeki(eanCode: String): Observable<Medicaments> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    console.log(header);
    return this.http.get<Medicaments>('https://e-leki.azurewebsites.net/api/medicaments?ean=' + eanCode,  {headers: header});
  }

  postMedicament(medicaments: Medicaments): Observable<Medicaments> {
    console.log(medicaments);
    return this.http.post<Medicaments>('https://pharmacy.azurewebsites.net/api/Medicaments', medicaments);
  }

  putUser(user: User): Observable<String> {
    return this.http.put<String>('https://pharmacy.azurewebsites.net/api/Users', user);
  }

  login(login: Login): Observable<Confirm> {
    return this.http.post<Confirm>('https://pharmacy.azurewebsites.net/api/Login', login);
  }

  register(user: User): Observable<String> {
    console.log(user);
    return this.http.post<string>('https://pharmacy.azurewebsites.net/api/Users', user);
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>('https://pharmacy.azurewebsites.net/api/Users');
  }

  getUserByEmail(email: String): Observable<User> {
    return this.http.get<User>('https://pharmacy.azurewebsites.net/api/Users/'+email);

  }

  postPrescription(prescription: Prescription): Observable<String>{
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    console.log(prescription);
    return this.http.post<String>('https://pharmacy.azurewebsites.net/api/Prescriptions', prescription,  {headers: header});
  }


  getPrescriptions(): Observable<Array<Prescription>> {
    return this.http.get<Array<Prescription>>('https://pharmacy.azurewebsites.net/api/Prescriptions');
  }

  getSales(): Observable<Array<Sale>> {
    return this.http.get<Array<Sale>>('https://pharmacy.azurewebsites.net/api/Sales');
  }

}
