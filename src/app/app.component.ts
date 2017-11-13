import { Component, OnInit } from '@angular/core';
import {ContextService } from '../services/context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private context: ContextService) {
  }
  ngOnInit() {
  }
}
