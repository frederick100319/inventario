import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  forma!: FormGroup;
  loading = false;

  constructor(private fb:FormBuilder, private router: Router, private messageService:MessageService, private loginService:LoginService ){
    this.formularioLogin()
  }
  formularioLogin(){

    this.forma=this.fb.group({
      cedula:['', [Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]+")]],
      contrasena:['',[Validators.required]]
    })
  }
  login() {
    if (this.forma.valid) {
      const { cedula, contrasena } = this.forma.value;
      this.loading = true; 
      this.loginService.login(cedula, contrasena).subscribe(
        (response) => {
          console.log("Respuesta del servicio de autenticación:", response);
          console.log("Respuesta del token:", response.accessToken);
          if (response && response.accessToken) {
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('usuario', response.user.userId);
            this.messageService.add({ severity: 'success', summary: 'Enhorabuena', detail: 'Inicio de sesión exitosa', life: 5000 })
            setTimeout(() => {
              this.router.navigate(['/home'])
              this.loading = false;
            }, 3000);
          } else {
            console.error('La respuesta no contiene un token válido:', response);
          }
        },
        (error) => {
          console.error('Error del backend:', error);
          this.loading = false
          this.messageService.add({ severity: 'error', summary: 'Lo sentimos...', detail: error, life: 5000 });
        }
      )
    }else if (this.forma.invalid) {
      this.loading = false
      this.messageService.add({ severity: 'error', summary: 'Lo sentimos...', detail: 'El formulario está vacío o no se ha llenado correctamente.', life: 5000 });
    }
  }
  

  private isControlInvalid(controlName: string): boolean {
    const control = this.forma.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  
  getControlClasses(controlName: string): string {
    return this.isControlInvalid(controlName) ? 'ng-dirty ng-invalid' : '';
  }
  get cedulaInvalid(): boolean {
    return this.isControlInvalid('cedula');
  }
  get contrasenaInvalid(): boolean {
    return this.isControlInvalid('contrasena');
  }
}  
