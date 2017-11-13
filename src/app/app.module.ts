import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//needed to consume the services
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
//import custom service to provide them
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';
import {ContextService } from '../services/context.service';
import { LoginComponent } from './login/login.component';
//import material module
import { MatCardModule, MatFormFieldModule,
   MatInputModule, MatButtonModule, MatIconModule, MatError,
  MatStepperModule, MatSidenavModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {EqualValidator } from './directives/equal-validator-directive'
import { UniqueValidator } from './directives/remote-validation-directive';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EqualValidator,
    UniqueValidator,
    HomeComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSidenavModule
  ],
  providers: [HttpService, UserService, ContextService],
  bootstrap: [AppComponent,LoginComponent]
})
export class AppModule { }
