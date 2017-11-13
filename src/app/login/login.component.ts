import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ContextService } from '../../services/context.service' 
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showComponent: boolean;
  hide=true;
  login:FormGroup;
  username:string;
  private subscription: Subscription;
  password:string;
  error = false;

  constructor(private fb:FormBuilder, private userService:UserService, private contextService:ContextService) {
    this.showComponent = true;
    this.subscription = this.contextService.get('login').subscribe(res => {
      this.showComponent = res;
    });
    this.createForm();
  }

 

  private createForm() {
    this.login = this.fb.group({
      username : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]] ,
      password : ['', Validators.required]
    })
  }

  public authenticate() {
    if(this.login.valid) {
      this.userService.authenticate(this.username, this.password).subscribe(res => {
        let result = res.json();
        if(result.status === 'ok') {
          this.contextService.setEmail(result.user.email);
          this.contextService.setToken(result.token);
          this.contextService.setUsername(result.user.username)
          this.showComponent = false;
          this.contextService.update(true, 'home');  
          this.error = false;
        } else {
          this.error = true;
        }
        
      });
    }
  }

  public clear() {
    this.username = undefined;
    this.password = undefined;
  }

  private hasErrors() {
    let uControl:AbstractControl = this.login.get('username');
    let pControl:AbstractControl = this.login.get('password');
    return (!uControl.hasError('required') && !pControl.hasError('required')
              && !uControl.hasError('minlength') && !uControl.hasError('maxLength')) ;
  }

  public register() {
    this.contextService.update(false, 'login');    
    this.contextService.update(true, 'register');
  }


}
