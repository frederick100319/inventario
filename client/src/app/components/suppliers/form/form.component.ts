import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { City } from '../../../interfaces/city';
import { CityService } from '../../../services/city/city.service';
import { SuppliersService } from '../../../services/suppliers/suppliers.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formSupplier!: FormGroup;
  cities:City[]=[];
  filteredCities:City[]=[]


  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  constructor( private cityService:CityService, private fb:FormBuilder, private supplierService:SuppliersService, private router:Router) {
    this.formularioSupplier()
   }
   ngOnInit(): void {
    this.cityService.getCities().subscribe(
      (cities: City[]) => {
        console.log(cities)
        this.cities = cities.sort((a, b) => a.id_ciudad - b.id_ciudad);
        this.filteredCities = [...cities];
      },
      (error) => {
        console.error('Error al obtener ciudades:', error);
      }
    );}
   formularioSupplier(){
    this.formSupplier=this.fb.group({
      ruc:['',[Validators.required,Validators.minLength(13),Validators.maxLength(13),Validators.pattern("[0-9]+")]],
      empresa:['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      calle_1:['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      nro_casa:['',[Validators.minLength(3),Validators.maxLength(6)]]  ,
      calle_2:['',[Validators.minLength(3),Validators.maxLength(100)]],
      encargado:['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      nro_encargado:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]+")]],
      fk_ciudad:['',[Validators.required]],
    })
   }
   private isControlInvalid(controlName: string): boolean {
    const control = this.formSupplier.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  get rucInvalid(): boolean {
    return this.isControlInvalid('ruc');
  }

  get empresaInvalid(): boolean {
    return this.isControlInvalid('empresa');
  }

  get calle_principalInvalid(): boolean {
    return this.isControlInvalid('calle_principal');
  }

  get nroCasaInvalid(): boolean {
    return this.isControlInvalid('nroCasa');
  }

  get calle_secundariaInvalid(): boolean {
    return this.isControlInvalid('calle_secundaria');
  }

  get encargadoInvalid(): boolean {
    return this.isControlInvalid('encargado');
  }

  get nro_encargadoInvalid(): boolean {
    return this.isControlInvalid('nro_encargado');
  }

  get ciudadInvalid(): boolean {
    return this.isControlInvalid('ciudad');
  }
  
    nombre: string = '';
  
    cancel(): void {
      this.onCancel.emit();
    }
  
    save() {
      if (this.formSupplier.valid) {
        const formData = { ...this.formSupplier.value };
        this.onCancel.emit()
        this.supplierService.postSupplier(formData).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'En hora buena',
              text: 'Se agregó el proveedor',
              iconColor: '#124074',
              confirmButtonColor: '#124074',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
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
