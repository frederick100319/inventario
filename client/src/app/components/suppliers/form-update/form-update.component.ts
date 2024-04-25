import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { City } from '../../../interfaces/city';
import { CityService } from '../../../services/city/city.service';
import { SuppliersService } from '../../../services/suppliers/suppliers.service';
import { Supplier } from '../../../interfaces/supplier';


@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrl: './form-update.component.css'
})
export class FormUpdateComponent {
  
    formUpdateSupplier!: FormGroup;
    cities:City[]=[];
    filteredCities:City[]=[]
    @Input() supplier: Supplier | null = null;

    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    
    constructor( private cityService:CityService, private fb:FormBuilder, private supplierService:SuppliersService, private router:Router) {}
     ngOnInit(): void {
      this.formularioEditSupplier()
      this.cityService.getCities().subscribe(
        (cities: City[]) => {
          console.log(this.supplier)
          console.log(cities)
          this.cities = cities.sort((a, b) => a.id_ciudad - b.id_ciudad);
          this.filteredCities = [...cities];
        },
        (error) => {
          console.error('Error al obtener ciudades:', error);
        }
      );}
    

     formularioEditSupplier() {
      console.log('Supplier antes de la inicialización del formulario:', this.supplier);
      this.formUpdateSupplier = this.fb.group({
        empresa: [this.supplier?.empresa, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        calle_1: [this.supplier?.calle_1 || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        nro_casa: [this.supplier?.nro_casa || '', [Validators.minLength(3), Validators.maxLength(6)]],
        calle_2: [this.supplier?.calle_2 || '', [Validators.minLength(3), Validators.maxLength(100)]],
        encargado: [this.supplier?.encargado || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern("^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$")]],
        nro_encargado: [this.supplier?.nro_encargado || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]+")]],
        fk_ciudad: [this.supplier?.fk_ciudad.id_ciudad || '', [Validators.required]],
      });
    }
    
   private isControlInvalid(controlName: string): boolean {
    const control = this.formUpdateSupplier.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
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
  
  canceled(): void {
    this.onCancel.emit();
  }

  put() {
    if (this.formUpdateSupplier.valid) {
      if (this.supplier && this.supplier.ruc) {
        const ruc = this.supplier.ruc;
        const formData = { ...this.formUpdateSupplier.value };
        this.supplierService.editSupplier(ruc, formData).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: '¡En hora buena!',
              text: 'Se actualizó el proveedor',
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
              title: '¡Lo sentimos!',
              text: error,
              iconColor: '#124074',
              confirmButtonColor: '#124074',
            });
          }
        );
      }
      this.onCancel.emit();
    }
  }
}
