import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login/login.service';
import { ResetAuthService } from '../../services/reset-auth/reset-auth.service';

@Component({
  selector: 'app-reset-auth',
  templateUrl: './reset-auth.component.html',
  styleUrl: './reset-auth.component.css',
  providers: [MessageService]
})
export class ResetAuthComponent {
  formPassword!: FormGroup;
  resetToken: string = '';
  loading = false;
  envioExitoso=false
  contrasenasCoinciden:boolean=true;

  constructor(private fb:FormBuilder, private route: ActivatedRoute, private messageService:MessageService, private resetAuthService:ResetAuthService ){
    this.passwordForm()
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resetToken = params['token'] || '';
      console.log('Token recibido:', this.resetToken);
    });
  }
  passwordForm(){

    this.formPassword=this.fb.group({
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

  enviar(token:string) {
    if (this.formPassword.valid) {
      this.loading = true;
      const { nuevaContrasena } = this.formPassword.value;
      this.resetAuthService.enviar(token, nuevaContrasena).subscribe(
        (response) => {
          this.loading = false;
          this.envioExitoso = true;
          this.messageService.add({ severity: 'success', summary: 'Enhorabuena', detail: 'Se actualizó la contraseña', life: 60000 });
          setTimeout(() => {
            window.location.href='/login';
          }, 2000);
        },
        (error) => {
          console.error('Error del backend:', error);
          this.messageService.add({ severity: 'error', summary: 'Lo sentimos...', detail: error });
          ;setTimeout(() => {
            window.location.href='/forgot-password';
          }, 5000);
        }
      )
    } else {
      this.messageService.add({ severity: 'error', summary: 'Lo sentimos...', detail: 'El formulario está vacío o no se ha llenado correctamente.' })
      this.loading = true;
      setTimeout(() => {
        window.location.href='/forgot-password';
      }, 5000);
      
    }
  }
  
  

  private isControlInvalid(controlName: string): boolean {
    const control = this.formPassword.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  getControlClasses(controlName: string): string {
    return this.isControlInvalid(controlName) ? 'ng-dirty ng-invalid' : '';
  }

  get passwordInvalid(): boolean {
    return this.isControlInvalid('nuevaContrasena');
  }
  get checkInvalid(): boolean {
    return this.isControlInvalid('verificarContrasena');
  }
  pageRedirection(){
    this.loading=true
    setTimeout(() => {
      window.location.href='/forgot-password';
    }, 3000);
  }
}
