import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ContextService {
  
  private user;
  private showLogin: Subject<boolean>;
  public showRegister: Subject<boolean>;
  public showHome:Subject<boolean>;
  subject = new Subject<boolean>();

  constructor() { 
    this.user = {username: undefined, email: undefined, token: undefined};
    this.showLogin = new Subject<boolean>();
    this.showHome = new Subject<boolean>();
    this.showRegister = new Subject<boolean>();
    this.showLogin.next(true);
    this.showHome.next(false);
    this.showRegister.next(false);  
    
  }
  public getUsername(): string {
    return this.user.username;
  }
  public getToken(): string{
    return this.user.token
  }
  public getEmail(): string{
    return this.user.email;
  }

  public setUsername(value: string) {
    this.user.username = value;
  }
  public setToken(value: string) {
    this.user.token = value;
  }
  public setEmail(value: string) {
    this.user.email = value;
  }

  public update(bool:boolean, element: string) {

    switch(element) {
      case 'login' :
      this.showLogin.next(bool) 
      break;
      case 'register' :
      this.showRegister.next(bool);
      break;
      case 'home' :
      this.showHome.next(bool);
      break  
    }
  }

  public get(element: string): Observable<any>{
    switch(element) {
      case 'login' :
      return this.showLogin.asObservable(); 
      case 'register' :
      return this.showRegister.asObservable();
      case 'home' :
      return this.showHome.asObservable();
    }
  }

}
