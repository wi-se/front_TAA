import { Injectable } from '@angular/core';
import { Response, RequestOptions, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

  constructor(private http:Http) { 
    
  }
  
  public genericPost(url:string, data:string, token:string):Observable<any> {
    let headers: Headers = new Headers();  
    headers.append('Content-Type', 'application/json'); 
    if(token !== undefined && token != null && token != '' ) {
      headers.append('Authorization', token); 
    }

    let options = new RequestOptions({
      headers:headers
    });
    return this.http.post(url, data, options).map(res => {
      return res;
    }, err => {
      console.log(err);
      return 'error';
    });
  }

  public genericGet(url:string, token: string): Observable<any> {
    let headers: Headers = new Headers();  
    headers.append('Content-Type', 'application/json');   
    if(token !== undefined && token != null && token != '' ) {
      headers.append('Authorization', token);       
    }
    let option = new RequestOptions({
      headers: headers
    })
    return this.http.get(url, option).map(res => {
      return res;
    }, err => {
      console.log(err);
      return 'error';
    });
  }
}
