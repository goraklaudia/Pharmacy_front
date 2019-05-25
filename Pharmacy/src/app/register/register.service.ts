import { User } from './User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<String> {
    console.log(user);
    return this.http.post<string>('https://pharmacy.azurewebsites.net/api/Users', user);
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>('https://pharmacy.azurewebsites.net/api/Users');
  }
}
