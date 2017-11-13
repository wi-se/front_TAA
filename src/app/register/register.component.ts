import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormArrayName, FormArray, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms'; 
import { ContextService } from '../../services/context.service'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showComponent:boolean;
  isLinear = true;
  hide1 = true;
  hide2 = true; 
  informationGroup: FormGroup;
  passwordGroup: FormGroup;
  passwordValue: string;
  usernameValue: string;
  emailValue: string;
  private subscription:Subscription;

  constructor(private _formBuilder: FormBuilder, private userService: UserService, private contextService: ContextService) {
    this.subscription = this.contextService.get('register').subscribe(res => {
      this.showComponent = res;
      if(this.showComponent) {
        this.createForm();
        
      }
    })
  }

  private createForm() {
    this.informationGroup = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.passwordGroup = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordAgain: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isValidInformationGroup():boolean {
    return this.informationGroup.valid;
   }

  isSamePassword(): boolean {
    return (this.passwordGroup.get('password').value === this.passwordGroup.get('passwordAgain').value 
    && this.passwordGroup.get('password').value!== null && this.passwordGroup.get('passwordAgain') !== null);
  }
  isValidPasswordGroup(): boolean {
    let p: AbstractControl = this.passwordGroup.get('password');
    let pa: AbstractControl = this.passwordGroup.get('passwordAgain');
    return (p.valid && pa.valid); 
  }

  createUser() {
    return this.userService.create(this.usernameValue, this.passwordValue, this.emailValue).subscribe(res => {
      let result = res.json();
      if(result.status ==='ok') {
        console.log('ok baby');
        this.contextService.setToken(result.token);
        this.contextService.setEmail(result.user.email);
        this.contextService.setUsername(result.user.username);
        this.contextService.update(false, 'register');
        this.contextService.update(true, 'home');
      }
    });
  }
}

 