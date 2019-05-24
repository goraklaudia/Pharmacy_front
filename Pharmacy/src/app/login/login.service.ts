import { Confirm } from './Confirm';
import { Observable } from 'rxjs';
import { Login } from './Login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  email: String;
  token: String;

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<Confirm> {
    return this.http.post<Confirm>('https://pharmacy.azurewebsites.net/api/Login', login);
  }
}
