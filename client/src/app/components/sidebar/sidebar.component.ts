import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  @Input() sideNavStatus:boolean=false
  list=[
  {
    number:'1',
    name:'Inicio',
    icon:'fa-solid fa-house',
    url:'/home'
  },
  {
    number:'2',
    name:'Ciudad',
    icon:"fa-solid fa-mountain-city",
    url:'/city'
  },  
  {
    number:'3',
    name:'Proveedor',
    icon:'fa-solid fa-users',
    url:'/suppliers'
  },
  {
    number:'4',
    name:'Producto',
    icon:'fa-solid fa-shop',
    url:'/home'
  },
  {
    number:'5',
    name:'Categoría',
    icon:'fa-solid fa-boxes-stacked',
    url:'/category'
  },
  {
    number:'6',
    name:'Cliente',
    icon:'fa-solid fa-user-tag',
    url:'/home'
  },
  {
    number:'7',
    name:'Venta',
    icon:'fa-solid fa-handshake',
    url:'/home'
  }
  ]
  ngOnInit(): void {1}

}
