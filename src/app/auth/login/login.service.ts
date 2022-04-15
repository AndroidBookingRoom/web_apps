import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL = `${environment.URL}`;

  constructor(
    private http: HttpClient
  ) {
  }

  authenticateUser(data:any): Observable<any> {
    return this.http.post(this.API_URL + `api/user/authenticate`, data);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.API_URL + `api/user/saveOrUpdate`, data);
  }
}
