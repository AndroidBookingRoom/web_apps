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
  API_URLDeploy = `${environment.URLDeploy}`;


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

  getListOptionHotel(): Observable<any> {
    return this.http.get(this.API_URL + 'api/option-hotel/getAllOptionHotel');
  }
  createOptionHotel(data:any):Observable<any>{
    return this.http.post(this.API_URL + 'api/option-hotel/createOptionHotel',data);
  }
  deleteOptionHotel(id:any):Observable<any>{
    return this.http.delete(this.API_URL + 'api/option-hotel/deleteOptionHotel', {params:{"id":id}});

  }
  getListRoom(): Observable<any> {
    return this.http.get(this.API_URL + 'api/room/get-all-room');
  }

  createRoom(data: any): Observable<any> {
    return this.http.post(this.API_URL + 'api/room/create-room', this.convertFormFile(data));
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete(this.API_URL + 'api/room/delete-room', {params: {"id": id}});
  }

  getListKOR(): Observable<any> {
    return this.http.get(this.API_URL + 'api/kod/getAllKOD');
  }

  createKOR(data: any): Observable<any> {
    return this.http.post(this.API_URL + 'api/kod/createKOD', this.convertFormFile(data));
  }

  deleteKOR(id: any): Observable<any> {
    return this.http.delete(this.API_URL + 'api/kod/deleteKOD', {params: {"id": id}});
  }

  getListHotel(): Observable<any> {
    return this.http.get(this.API_URL + `api/hotel/getListHotel`);
  }

  // getListHotel(): Observable<any> {
  //   return this.http.get(this.API_URLDeploy + `api/hotel/getListHotel`, );
  // }

  deleteHotel(guid: any): Observable<any> {
    return this.http.delete(this.API_URL + `api/hotel/deleteHotel`, {params: {"id": guid}});
  }

  // deleteHotel(guid: any): Observable<any> {
  //   return this.http.delete(this.API_URLDeploy + `api/hotel/deleteHotel`, {params: {"id": guid}});
  // }

  addHotel(data: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.API_URL + `api/hotel/create-hotel`, this.convertFormFile(data));
  }

  // addHotel(data: any): Observable<any> {
  //   // @ts-ignore
  //   return this.http.post(this.API_URLDeploy + `api/hotel/create-hotel`, this.convertFormFile(data));
  // }

}
