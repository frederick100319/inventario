import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth', 
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  forma!: FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router ){
    this.formularioLogin()
  }

formularioLogin(){

    this.forma=this.fb.group({
      cedula:['', [Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]+")]],
      contrasena:['',[Validators.required]]
    })
  }
  get cedulaInvalid() {
    const control = this.forma.get('cedula');
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  guardar() {
    if (this.forma.valid) {
      const { cedula, contrasena } = this.forma.value;
      this.authService.login(cedula, contrasena).subscribe(
        (response) => {
          console.log("Respuesta del servicio de autenticación:", response)
          console.log("Respuesta del token:", response.accessToken);
          if (response && response.accessToken) {
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('usuario', response.user.userId)
            this.router.navigate(['/home']);
          } else {
            console.error('La respuesta no contiene un token válido:', response);
          }
        },
        (error) => {

          console.error('Error del backend:', error);
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos...',
            text: error,
            iconColor:'#124074',
            confirmButtonColor:'#124074',
            
          
          });
        }
      );
    }
  }
  
}

