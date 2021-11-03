import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseModel } from 'src/app/models/base-models/base-model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  headers: HttpHeaders;
  protected http: HttpClient;
  public API_EndPoint = 'http://localhost:3000';
  constructor(https: HttpClient) {
    this.http = https;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Authorization':'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImVtYWlsIjoic3RyaW5nIiwiaWF0IjoxNjM1NzA5MzI3fQ.ADBqUK_cT7Pv0f7pt-QTAeCFkGj3iJQWVhe90NTiDX8'
    });
    this.headers = headers;
   }
   async post<T>(url: string, request: any): Promise<BaseModel<T>> {
    let response: BaseModel<T> = {} as BaseModel<T>;

    try {      
      let tempResponse = await this.http.post<T>(this.API_EndPoint + url, request, { headers: this.headers }).toPromise();
      if (tempResponse) {
        response.data = tempResponse;
        response.hasError = false;
        response.error = {};
      }

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.log("Error while POST", error);
      return response;
    }
  }

  async put<T>(url: string, request: any, headers: any = {}): Promise<BaseModel<T>> {
    let response: BaseModel<T> = {} as BaseModel<T>;

    try {
      let tempResponse = await this.http.put<T>(this.API_EndPoint + url, request, { headers: headers ?? this.headers }).toPromise();

      if (tempResponse) {
        response.hasError = false;
        response.data = tempResponse;
        response.error = {};
      }

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.error("Error while PUT:", error);
      return response;
    }
  }

  async delete<T>(url: string): Promise<BaseModel<T>> {
    let response: BaseModel<T> = {} as BaseModel<T>;

    try {
      let tempResponse = await this.http.delete<T>(this.API_EndPoint + url, { headers: this.headers }).toPromise();

      if (tempResponse) {
        response.data = tempResponse;
        response.hasError = false;
        response.error = {};
      }

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.log("Error while DELETE", error);
      return response;
    }
  }

  async get<T>(url: string): Promise<BaseModel<T>> {
    let response: BaseModel<T> = {} as BaseModel<T>;
    try {
      let tempResponse = await this.http.get<T>(this.API_EndPoint + url, { headers: this.headers }).toPromise();
      if (tempResponse) {
        response.data = tempResponse;
        response.hasError = false;
        response.error = {};
      }

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.log("Error while GET", error);
      return response;
    }
  }
}
