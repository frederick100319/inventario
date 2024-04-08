import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor NestJS

  constructor(private http: HttpClient) { }
  getCities(){
    return this.http.get<[]>(`${this.apiUrl}/ciudad`);
  }
}
