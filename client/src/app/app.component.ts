import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  sideNavStatus:boolean=false
  isVisible:boolean=false
  
  constructor(private router: Router ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isVisible = !(
          event.url.includes('login') ||
          event.url.includes('password-reset') ||
          event.url.includes('forgot-password')
        );
      }
    });
  }
}
