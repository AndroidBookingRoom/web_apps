import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {parseArguments} from "@angular/cli/models/parser";

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  API_URL = `${environment.URL}`;

  constructor(
    private http: HttpClient
  ) {
  }

  convertFormFile(dataPost: any): FormData {
    // const filteredData = CommonUtils.convertData(dataPost);
    const formData = this.objectToFormData(dataPost);
    return formData;
  }

  objectToFormData(form: any): FormData {
    const formData = new FormData();
    for (const key of Object.keys(form)) {
      const value = form[key];
      if (typeof value === typeof []) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value instanceof Array) {
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        }
      } else {
        formData.append(key, value);
      }
    }
    return formData;
  }

  getListHotel(): Observable<any> {
    return this.http.get(this.API_URL + `api/hotel/getListHotel`, );
  }

  deleteHotel(guid: any): Observable<any> {
    return this.http.delete(this.API_URL + `api/hotel/deleteHotel`, {params: {"id": guid}});
  }

  addHotel(data: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.API_URL + `api/hotel/create-hotel`, this.convertFormFile(data));
  }

}
