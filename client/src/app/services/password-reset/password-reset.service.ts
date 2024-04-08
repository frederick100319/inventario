import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { url } from 'node:inspector';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) {}

  enviar(token: string, nuevaContrasena: string,): Observable<any> {
    console.log(token)
    return this.http.post<any>(`http://localhost:3000/usuarios/reset-password/${token}`,{token, nuevaContrasena}).pipe(
      
      catchError(error => {
        if (error.status === 404) {
          const errorMessage = 'Token expirado, vuelve a intentarlo';
          return throwError(errorMessage);
        }
        return throwError(error);
      })
    );
  }
  
}

