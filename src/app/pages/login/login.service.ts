import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginResponse } from './models/login-response';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseURL = environment["urlAPI"];

  constructor(private httpClient: HttpClient ) {
  }

  loginUser(): Observable<ILoginResponse[]> {
    return this.httpClient.get<ILoginResponse[]>(`${this.baseURL}/account`);
  }
}
