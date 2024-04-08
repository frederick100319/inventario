import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasswordResetService } from '../../services/password-reset/password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  resetToken: string = '';
  passwordForm!: FormGroup;
  contrasenasCoinciden:boolean=true;

  constructor(private fb:FormBuilder, private route: ActivatedRoute, private passwordResetService:PasswordResetService) { 
    this.passwordResetForm()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resetToken = params['token'] || '';
      console.log('Token recibido:', this.resetToken);
    });
  }
  passwordResetForm() {
    this.passwordForm = this.fb.group({
        nuevaContrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
        verificarContrasena: ['', Validators.required]
    }, {
        validator: this.checkPasswords.bind(this)
    });
}
  checkPasswords(group: FormGroup): { [key: string]: boolean } | null {
    const passwordControl = group.get('nuevaContrasena');
    const confirmPasswordControl = group.get('verificarContrasena');

    const password = passwordControl?.value;
    const confirmPassword = confirmPasswordControl?.value;

    return password === confirmPassword ? null : { notSame: true };
}


  get contrasenaInvalid() {
    const control = this.passwordForm.get('nuevaContrasena');
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  enviar(token: string) {
    console.log(token)
    if (this.passwordForm.valid) {
      console.log(token)
      const { nuevaContrasena } = this.passwordForm.value;
      this.passwordResetService.enviar(token, nuevaContrasena).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: '¡Enhorabuena!',
            text: 'Se cambió la contraseña con éxito.',
            iconColor: '#124074',
            confirmButtonColor: '#124074',
          });
          setTimeout(() => {
            window.location.href='/login';
          }, 5000);
        },
        (error) => {
          console.error('Error del backend:', error);
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos...',
            text: error,
            iconColor: '#124074',
            confirmButtonColor: '#124074',
          });
          setTimeout(() => {
            window.location.href='/forgot-password';
          }, 2000);
        }
      );
    }
  }
  
}



