import { Component, OnInit, OnChanges, SimpleChanges,  } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ContextService } from '../../services/context.service' 
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showComponent: boolean;
  activities:Array<any>;
  subscription: Subscription;
  username:string;

  constructor(private userService: UserService, private contextService: ContextService) {
    this.showComponent = false;
    this.subscription = this.contextService.get('home').subscribe((data) => {
      this.showComponent = data;
      if(this.showComponent) {
        this.activities = [];
        this.getActivites();
        this.username = this.contextService.getUsername();
      }  
    })
  }

  public getActivites() {
    this.userService.getActivites(this.contextService.getUsername()
    , this.contextService.getEmail(),this.contextService.getToken()).subscribe(res => {
      this.activities = res.json();
      console.log(this.activities);
    })
  }

  public logout() {
    this.userService.logout(this.contextService.getUsername(), this.contextService.getToken()).subscribe(res => {
      let result = res.json();
      if(result.status === 'ok') {
        this.showComponent = false;
        this.contextService.update(false, 'home');
        this.contextService.update(true, 'login');
        this.contextService.setToken(undefined);
        this.contextService.setEmail(undefined);
        this.contextService.setUsername(undefined);
      }
      
    })
  }

}
