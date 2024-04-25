import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importa throwError desde RxJS
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor NestJS

  constructor(private http: HttpClient) { }
  getCities(){
    return this.http.get<[]>(`${this.apiUrl}/ciudad`);
  }
  postCitY(nombre:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/ciudad`, {nombre}).pipe(
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
  editCity(id:string, nombre:string):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/ciudad/${id}`, {nombre}).pipe(
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
