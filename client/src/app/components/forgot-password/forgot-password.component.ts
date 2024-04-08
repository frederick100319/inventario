import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password/forgot-password.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgot_form!: FormGroup;

  constructor(private fb:FormBuilder, private forgotPasswordService:ForgotPasswordService, private router:Router ){
    this.formularioForgot()
  }
  formularioForgot(){
    this.forgot_form=this.fb.group({
      cedula:['', [Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]+")]],
      email:['',[Validators.required, Validators.email]]
    })
  }
  get cedulaInvalid() {
    const control = this.forgot_form.get('cedula');
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  get emailInvalid(){
    const control= this.forgot_form.get('email');
    return control ? control.invalid && (control.dirty || control.touched ):false
  }
  enviar(){
    if (this.forgot_form.valid) {
      const { cedula, email } = this.forgot_form.value;
      this.forgotPasswordService.recuperar(cedula, email).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'En hora buena',
            text: 'Se envió un enlace de recuperación a tu email',
            iconColor:'#124074',
            confirmButtonColor:'#124074',
          });
          setTimeout(() => {
            window.location.reload();
          }, 5000);
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
