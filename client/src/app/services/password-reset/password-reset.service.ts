import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) {}
  recuperar(cedula: string, email: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/usuarios/reset-password-request', { cedula, email }).pipe(
      catchError(error => {
      if (error.status===404){
          const errorMessage = 'Usuario o correo electrónico no encontrado';
          return throwError(errorMessage);
        }
        return throwError(error);
      })
    );
  }
}

