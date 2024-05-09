import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login/login.service';
import { PasswordResetService } from '../../services/password-reset/password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css',
  providers: [MessageService]
})
export class PasswordResetComponent {
  formForgot!: FormGroup;
  loading = false;
  envioExitoso=false
  constructor(private fb:FormBuilder, private router: Router, private messageService:MessageService, private passwordResetService:PasswordResetService ){
    this.formularioLogin()
  }
  formularioLogin(){

    this.formForgot=this.fb.group({
      cedula:['', [Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]+")]],
      email:['',[Validators.required, Validators.email]]
    })
  }
  enviar() {
    if (this.formForgot.valid) {
      this.loading = true;
      const { cedula, email } = this.formForgot.value;
      this.passwordResetService.recuperar(cedula, email).subscribe(
        (response) => {
          this.loading = false;
          this.envioExitoso = true; // Indica que el envío fue exitoso
          this.messageService.add({ severity: 'success', summary: 'Enhorabuena', detail: 'Se envió un enlace de recuperación a tu email', life: 60000 });
        },
        (error) => {
          console.error('Error del backend:', error);
          this.messageService.add({ severity: 'error', summary: 'Lo sentimos...', detail: error });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Lo sentimos...', detail: 'El formulario está vacío o no se ha llenado correctamente.' })
    }
  }
  
  

  private isControlInvalid(controlName: string): boolean {
    const control = this.formForgot.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  getControlClasses(controlName: string): string {
    return this.isControlInvalid(controlName) ? 'ng-dirty ng-invalid' : '';
  }

  get cedulaInvalid(): boolean {
    return this.isControlInvalid('cedula');
  }
  get emailInvalid(): boolean {
    return this.isControlInvalid('email');
  }
  pageRedirection(){
    this.loading=true
    setTimeout(() => {
      window.location.href='/login';
    }, 3000);
  }
}
