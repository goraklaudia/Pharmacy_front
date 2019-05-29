import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicaments } from './objects//Medicaments';
import { User } from './objects/User';
import { Login } from './objects/Login';
import { Confirm } from './objects/Confirm';
import { Prescription } from './objects/Prescription';
import { Sale } from './objects/Sale';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  email: String;
  token: String;

  constructor(private http: HttpClient) { }

  getSale(): Observable<Sale> {
    return this.http.get<Sale>('https://pharmacy.azurewebsites.net/api/Sales');

  }

  getPrescription(peselPacientER: String, verCodeER: String): Observable<Prescription> {
    // const header = new HttpHeaders({'Authorization': 'Token ' + this.token});
    // ,  {headers: header}
    // tslint:disable-next-line:max-line-length
    return this.http.get<Prescription>('https://e-recepta.azurewebsites.net/api/prescriptions/' + peselPacientER + '?code=' + verCodeER);
  }

  getMedicaments(): Observable<Array<Medicaments>> {
    return this.http.get<Array<Medicaments>>('https://pharmacy.azurewebsites.net/api/Medicaments');
  }

  getMedicament(eanCode: String): Observable<Medicaments> {

    return this.http.get<Medicaments>('https://pharmacy.azurewebsites.net/api/Medicaments/' + eanCode);
  }

  getMedicamentELeki(eanCode: String): Observable<Medicaments> {
    return this.http.get<Medicaments>('https://e-leki.azurewebsites.net/api/medicaments/?ean=' + eanCode);
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

}
