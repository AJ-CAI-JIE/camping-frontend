import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { ApiModel } from '../models/api-model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private serverIp = environment.serverIp;
  private httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': '',
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authSerive.getToken() || '',
    })
  };

  constructor(
    private http: HttpClient,
    private authSerive: AuthService,
  ) {
  }

  getData<T>(url: string): Observable<ApiModel<T>> {
    return this.http.get<ApiModel<T>>(this.serverIp + url, this.httpOptions);
  }

  postData<T>(url: string, data: object): Observable<ApiModel<T>> {
    if (url === '/login') {
      // @ts-ignore
      this.httpOptions['observe'] = 'response' as 'response';
    }

    return this.http.post<ApiModel<T>>(this.serverIp + url, data, this.httpOptions);
  }

  putData<T>(url: string, data: object): Observable<ApiModel<T>> {
    return this.http.put<ApiModel<T>>(this.serverIp + url, data, this.httpOptions);
  }

  patchData<T>(url: string, data: object): Observable<ApiModel<T>> {
    return this.http.patch<ApiModel<T>>(this.serverIp + url, data, this.httpOptions);
  }

  deleteData<T>(url: string, data: object): Observable<ApiModel<T>> {
    return this.http.delete<ApiModel<T>>(this.serverIp + url, this.httpOptions);
  }

}
