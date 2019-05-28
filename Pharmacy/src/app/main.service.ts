import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicaments } from './objects//Medicaments';
import { User } from './objects/User';
import { Login } from './objects/Login';
import { Confirm } from './objects/Confirm';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  email: String;
  token: String;

  constructor(private http: HttpClient) { }

  getMedicaments(): Observable<Array<Medicaments>> {
    return this.http.get<Array<Medicaments>>('https://pharmacy.azurewebsites.net/api/Medicaments');
  }

  getMedicament(eanCode: String): Observable<Medicaments> {

    return this.http.get<Medicaments>('https://pharmacy.azurewebsites.net/api/Medicaments/' + eanCode);
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
