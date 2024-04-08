import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) { }
  totalCities: number = 0;
  totalProducts: number = 0;
  totalCategories: number = 0;
  totalClients: number = 0;
  totalDeals: number = 0;
  totalSuppliers: number = 0;
  list: any[] = [];

  ngOnInit(): void {
    this.homeService.getTotalCities().subscribe(
      (totalCities: number) => {
        this.totalCities = totalCities;
        this.updateList();
      },
      (error) => {
        console.error('Error fetching total cities:', error);
      }
    );
    this.homeService.getTotalProducts().subscribe(
      (totalProducts: number) => {
        this.totalProducts = totalProducts;
        this.updateList();
      },
      (error) => {
        console.error('Error fetching total products:', error);
      }
    );
    this.homeService.getTotalCategories().subscribe(
      (totalCategories: number) => {
        this.totalCategories = totalCategories;
        this.updateList();
      },
      (error) => {
        console.error('Error fetching total categories:', error);
      }
    );
    this.homeService.getTotalClients().subscribe(
      (totalClients: number) => {
        this.totalClients = totalClients;
        this.updateList();
      },
      (error) => {
        console.error('Error fetching total clients:', error);
      }
    );
    this.homeService.getTotalDeals().subscribe(
      (totalDeals: number) => {
        this.totalDeals = totalDeals;
        this.updateList();
      },
      (error) => {
        console.error('Error fetching total deals:', error);
      }
    );
    this.homeService.getTotalSuppliers().subscribe(
      (totalSuppliers: number) => {
        this.totalSuppliers = totalSuppliers;
        this.updateList();
      },
      (error) => {
        console.error('Error fetching total suppliers:', error);
      }
    );
  }

  updateList(): void {
    this.list = [
      { 
        count: this.totalCities,
        countName: 'Ciudades',
        name: 'Ciudad',
        icon: 'fa-solid fa-mountain-city',
        ruta: '/home'
      },
      {
        count: this.totalSuppliers,
        countName: 'Proveedores',
        name: 'Proveedor',
        icon: 'fa-solid fa-users',
        ruta: '/home'
      },
      {
        count: this.totalProducts,
        countName: 'Productos',
        name: 'Producto',
        icon: 'fa-solid fa-shop',
        ruta: '/home'
      },
      {
        count: this.totalCategories,
        countName: 'Categorías',
        name: 'Categoría',
        icon: 'fa-solid fa-boxes-stacked',
        ruta: '/home'
      },
      {
        count: this.totalClients,
        countName: 'Clientes',
        name: 'Cliente',
        icon: 'fa-solid fa-user-tag',
        ruta: '/home'
      },
      {
        count: this.totalDeals,
        countName: 'Ventas',
        name: 'Venta',
        icon: 'fa-solid fa-handshake',
        ruta: '/home'
      }
    ];
  }
}

