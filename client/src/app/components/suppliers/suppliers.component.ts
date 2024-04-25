import { Component, OnInit } from '@angular/core';
import { City } from '../../interfaces/city';
import { HomeService } from '../../services/home/home.service';
import Swal from 'sweetalert2';
import { Supplier } from '../../interfaces/supplier';
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { CityService } from '../../services/city/city.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent {
  supplier: Supplier[] = [];
  cities:City[]=[];
  filteredSuppliers: Supplier[] = [];
  filteredCities:City[]=[]
  searchTerm: string = '';
  currentPage: number = 0;
  itemsPerPage: number = 5; 
  totalSupplier:number=0
  applyAnimation = false;
  showAddSupplierForm: boolean = false;
  showEditSupplierForm: boolean=false
  selectedSupplier: Supplier | null = null;

  constructor( private supplierService:SuppliersService, private homeService:HomeService, private cityService:CityService) { }


  ngOnInit(): void {
    this.homeService.getTotalSuppliers().subscribe(
      (totalSupplier: number) => {
        this.totalSupplier = totalSupplier;
      },
      (error) => {
        console.error('Error fetching total cities:', error);
      }
    );
    this.cityService.getCities().subscribe(
      (cities: City[]) => {
        console.log(cities)
        this.cities = cities.sort((a, b) => a.id_ciudad - b.id_ciudad);
        this.filteredCities = [...cities];
      },
      (error) => {
        console.error('Error al obtener ciudades:', error);
      }
    );

    this.supplierService.getSuppliers().subscribe(
      (suppliers: Supplier[]) => {
        this.supplier = suppliers.sort((a, b) => a.empresa.localeCompare(b.empresa));
        this.filteredSuppliers = [...suppliers];
      },
      (error) => {
        console.error('Error al obtener ciudades:', error);
      }
    );    
  }
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredSuppliers = [...this.supplier];
    } else {
      this.filteredSuppliers= this.supplier.filter(supplier =>
        supplier.empresa.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    this.currentPage = 0;
  }


  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyAnimation = true;
      setTimeout(() => {
        this.applyAnimation = false;
      }, 500);
    }
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.filteredSuppliers.length / this.itemsPerPage) - 1;
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.applyAnimation = true;
      setTimeout(() => {
        this.applyAnimation = false;
      }, 500);
    }
  }

getCategoriesForPage(): Supplier[] {
  const startIndex = this.currentPage * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredSuppliers.length);
  return this.filteredSuppliers.slice(startIndex, endIndex);
}

getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.filteredSuppliers.length / this.itemsPerPage);
  return Array.from({ length: pageCount }, (_, i) => i + 1);
}


cancelAddSupplier(): void {
  this.showAddSupplierForm = false;
}

toggleAddSupplierForm(): void {
  this.showAddSupplierForm = !this.showAddSupplierForm;
}
toggleEditSupplierForm(supplier:Supplier):void{
  this.selectedSupplier={...supplier}
  this.showEditSupplierForm=true
}
cancelEditSupplier(): void {
  this.showEditSupplierForm = false;
}
deleteSupplier(supplier: Supplier): void {
  Swal.fire({
    title: "Estás seguro?",
    text: "Esta acción afectará a los productos relacionados!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#6c757d",
    cancelButtonText:'Cancelar',
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.supplierService.deleteSupplier(supplier.ruc).subscribe(() => {
        Swal.fire({
          title: "Eliminado!",
          text: "El proveedor ha sido eliminado con éxito",
          icon: "success",
          confirmButtonColor:'#3085d6',
        });
        this.ngOnInit();
      });
    }
  });
}

}
