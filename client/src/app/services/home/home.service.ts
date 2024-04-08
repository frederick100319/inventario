import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor NestJS

  constructor(private http: HttpClient) { }

  getTotalCities(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ciudad/total`);
  }
  getTotalProducts(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/productos/total`);
  }
  getTotalCategories(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/categoria/total`);
  }
  getTotalClients(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/clientes/total`);
  }
  getTotalDeals(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ventas/total`);
  }
  getTotalSuppliers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/proveedor/total`);
  }
}

