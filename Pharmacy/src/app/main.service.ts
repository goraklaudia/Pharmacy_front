import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicaments } from './magazine/Medicaments';
import { User } from './register/User';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getMedicaments(): Observable<Array<Medicaments>> {
    return this.http.get<Array<Medicaments>>('https://pharmacy.azurewebsites.net/api/Medicaments');
  }

  postMedicament(medicaments: Medicaments): Observable<Medicaments> {
    console.log(medicaments);
    return this.http.post<Medicaments>('https://pharmacy.azurewebsites.net/api/Medicaments', medicaments);
  }

  putUser(user: User): Observable<String> {
    return this.http.put<String>('https://pharmacy.azurewebsites.net/api/Users', user);
  }

}
