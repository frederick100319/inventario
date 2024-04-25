import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importa throwError desde RxJS
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor NestJS

  constructor(private http: HttpClient) { }
  getCategories(){
    return this.http.get<[]>(`${this.apiUrl}/categoria`);
  }
  postCategory(nombre:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/categoria/nuevo`, {nombre}).pipe(
    catchError(error => {
      if (error.status === 401) {
        const errorMessage = 'Credenciales inválidas';
        return throwError(errorMessage);
      }
      else if (error.status===404){
        const errorMessage = 'Usuario no encontrado';
        return throwError(errorMessage);
      }
      return throwError(error);
      })
    )
  }
  editCategory(id:string, nombre:string):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/categoria/update/${id}`, {nombre}).pipe(
        catchError(error => {
          if (error.status === 401) {
            const errorMessage = 'Credenciales inválidas';
            return throwError(errorMessage);
          }
          else if (error.status===404){
            const errorMessage = 'Usuario no encontrado';
            return throwError(errorMessage);
          }
          return throwError(error);
          })
        )
    }
}
