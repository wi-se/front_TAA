import { Injectable } from '@angular/core';
import { HttpService } from './http.service'
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
  private baseUrl:string = 'http://localhost:8080/interface/v1';
  constructor(private httpService:HttpService) { 
  }

  public authenticate(username:string, password:string): Observable<Response> {
    let url:string = this.baseUrl + '/perm/authenticate';
    let body = {"username" : username, "password" : password};
    return this.httpService.genericPost(url, JSON.stringify(body), null);
  }

  public create(username:string, password:string, email:string): Observable<Response>  {
    let body = {'username' : username, 'password' : password, 'email' : email};
    let url:string = this.baseUrl + '/perm/create';
    return this.httpService.genericPost(url, JSON.stringify(body), null);
  }

  public remoteValidate(path: string, parameter: string): Observable<Response>{
    let url = this.baseUrl + '/perm/' + path + '?value=' + parameter;
    return this.httpService.genericGet(url, null);
  }

  public getActivites(username: string, mail: string, token: string) :Observable<Response> {
    let body = {'username' : username ,'email' : mail};
    let url = this.baseUrl + "/auth/get-favourite-activities";
    return this.httpService.genericPost(url, JSON.stringify(body) ,token);
  }

  public logout(username: string, token: string) :Observable<Response>{
    let url = this.baseUrl +"/auth/logout?username=" + username;
    return this.httpService.genericGet(url, token);
  }
}
