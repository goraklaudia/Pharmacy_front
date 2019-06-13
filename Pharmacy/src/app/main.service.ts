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
import { ElementJSONSaleNull } from './objects/ElementJSONSaleNull';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  email: String;
  token: String;
  access: String;
  uri: String = 'https://pharmacy.azurewebsites.net';
  uriEleki: String = 'https://e-leki.azurewebsites.net';
  uriErecepta: String = 'https://e-recepta.azurewebsites.net';


  constructor(private http: HttpClient) { }

  getSale(): Observable<Sale> {
    return this.http.get<Sale>(this.uri + '/api/Sales');
  }

  postSale(sales: Sale): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    return this.http.post<String>(this.uri + '/api/Sales', sales,  {headers: header})

  }

  postOrderNull(elements: ElementJSONSaleNull): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    return this.http.post<String>(this.uri + '/api/Orders', elements,  {headers: header})
  }

  postOrder(elements: ElementJSONSale): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    return this.http.post<String>(this.uri + '/api/Orders', elements,  {headers: header})
  }
  putOrder(elements: Order): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    return this.http.put<String>(this.uri + '/api/Orders/' + elements.id, elements,  {headers: header})
  }

  deleteOrder(elements: String): Observable<String> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    return this.http.delete<String>(this.uri + '/api/Orders/' + elements, {headers: header})
  }


  getOrder(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.uri + '/api/Orders');
  }

  getPrescription(peselPacientER: String, verCodeER: String): Observable<Prescription> {
    return this.http.get<Prescription>( this.uriErecepta + '/api/prescriptions/' + peselPacientER + '?code=' + verCodeER);
  }

  getPrescriptionElement(prescriptionId: String, eanCode: String): Observable<PrescriptionElement> {
    return this.http.get<PrescriptionElement>(this.uriErecepta + '/api/prescriptionElements/' + prescriptionId + '/' + eanCode);
  }

  putPrescriptionElement(prescription: PrescriptionElement): Observable<PrescriptionElement> {
    return this.http.put<PrescriptionElement>(this.uriErecepta + '/api/prescriptionElements/', prescription);
  }


  getMedicaments(): Observable<Array<Medicaments>> {
    return this.http.get<Array<Medicaments>>(this.uri + '/api/Medicaments');
  }

  getMedicament(eanCode: String): Observable<Medicaments> {

    return this.http.get<Medicaments>(this.uri + '/api/Medicaments/' + eanCode);
  }

  getMedicamentELeki(eanCode: String): Observable<Medicaments> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    return this.http.get<Medicaments>(this.uriEleki + '/api/medicaments?ean=' + eanCode,  {headers: header});
  }

  postMedicament(medicaments: Medicaments): Observable<Medicaments> {
    return this.http.post<Medicaments>(this.uri + '/api/Medicaments', medicaments);
  }

  putUser(user: User): Observable<String> {
    return this.http.put<String>(this.uri + '/api/Users', user);
  }

  login(login: Login): Observable<Confirm> {
    return this.http.post<Confirm>(this.uri + '/api/Login', login);
  }

  register(user: User): Observable<String> {
    return this.http.post<string>(this.uri + '/api/Users', user);
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.uri + '/api/Users');
  }



  getUserByEmail(email: String): Observable<User> {
    return this.http.get<User>(this.uri + '/api/Users/' + email);

  }

  getUserById(id: String): Observable<User> {
    return this.http.get<User>(this.uri + '/api/Users/'+id);

  }

  postPrescription(prescription: Prescription): Observable<String>{
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
    return this.http.post<String>(this.uri + '/api/Prescriptions/', prescription,  {headers: header});
  }


  getPrescriptions(): Observable<Array<Prescription>> {
    return this.http.get<Array<Prescription>>(this.uri + '/api/Prescriptions');
  }

  getSales(): Observable<Array<Sale>> {
    return this.http.get<Array<Sale>>(this.uri + '/api/Sales');
  }

}
