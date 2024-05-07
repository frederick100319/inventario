import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importa throwError desde RxJS
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(cedula: string, contrasena: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login', { cedula, contrasena }).pipe(
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
    );
  }
}
