import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isVisible: boolean = true;
  isSidebarVisible: boolean = false;

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus:boolean = false

  sideNavToggle(){
    this.menuStatus=!this.menuStatus
    this.sideNavToggled.emit(this.menuStatus)
  }
}

