
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importa throwError desde RxJS
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor NestJS

  constructor(private http: HttpClient) { }
  getSuppliers(){
    return this.http.get<[]>(`${this.apiUrl}/proveedor`);
  }
  postSupplier(formData: any): Observable<any> {
    console.log(formData);
    return this.http.post<any>(`${this.apiUrl}/proveedor`, formData).pipe(
      catchError(error => {
        if (error.status === 409) {
          const errorMessage = 'Ya existe un proveedor con el mismo RUC.';
          return throwError(errorMessage);
        } 
        return throwError(error);
      })
    );
  }
  editSupplier(ruc:string, proveedor: any): Observable<any> {
    console.log(ruc, proveedor);
    return this.http.put<any>(`${this.apiUrl}/proveedor/${ruc}`, proveedor).pipe(
      catchError(error => {
        if (error.status === 401) {
          const errorMessage = 'Credenciales inválidas';
          return throwError(errorMessage);
        } else if (error.status === 404) {
          const errorMessage = 'Usuario no encontrado';
          return throwError(errorMessage);
        }
        return throwError(error);
      })
    );
  }
  deleteSupplier(ruc:string){
    console.log(ruc);
    return this.http.delete<any>(`${this.apiUrl}/proveedor/${ruc}`).pipe(
      catchError(error => {
        if (error.status === 401) {
          const errorMessage = 'Credenciales inválidas';
          return throwError(errorMessage);
        } else if (error.status === 404) {
          const errorMessage = 'Usuario no encontrado';
          return throwError(errorMessage);
        }
        return throwError(error);
      })
    );
  }
  
}
