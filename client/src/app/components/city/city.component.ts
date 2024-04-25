import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city/city.service';
import { City } from '../../interfaces/city';
import { HomeService } from '../../services/home/home.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  filteredCities: City[] = [];
  searchTerm: string = '';
  currentPage: number = 0; // Página actual
  itemsPerPage: number = 5; // Cantidad de elementos por página
  totalCities:number=0
  applyAnimation = false;
  constructor( private cityService: CityService, private homeService:HomeService) { }


  ngOnInit(): void {
    this.homeService.getTotalCities().subscribe(
      (totalCities: number) => {
        this.totalCities = totalCities;
      },
      (error) => {
        console.error('Error fetching total cities:', error);
      }
    );
    this.cityService.getCities().subscribe(
      (cities: City[]) => {
        this.cities = cities.sort((a, b) => a.id_ciudad - b.id_ciudad);
        this.filteredCities = [...cities];
      },
      (error) => {
        console.error('Error al obtener ciudades:', error);
      }
    );
  }
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCities = [...this.cities];
    } else {
      this.filteredCities = this.cities.filter(city =>
        city.nombre.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
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
    const maxPage = Math.ceil(this.filteredCities.length / this.itemsPerPage) - 1;
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.applyAnimation = true;
      setTimeout(() => {
        this.applyAnimation = false;
      }, 500);
    }
  }

getCitiesForPage(): City[] {
  const startIndex = this.currentPage * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredCities.length);
  return this.filteredCities.slice(startIndex, endIndex);
}

getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.filteredCities.length / this.itemsPerPage);
  return Array.from({ length: pageCount }, (_, i) => i + 1);
}

postCity(nombre: string): void {
  this.cityService.postCitY(nombre).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'En hora buena',
        text: 'Se añadio nueva ciudad a la lista',
        iconColor:'#124074',
        confirmButtonColor:'#124074',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error
      });
    }
  );
}

editCity(city: any) {
  Swal.fire({
    title: 'Editar ciudad',
    html: `
      <label for="cityId">ID de la ciudad:</label>
      <input type="text" id="cityId" class="swal2-input" value="${city.id_ciudad}" disabled>
      <label for="cityName">Nombre de la ciudad:</label>
      <input type="text" id="cityName" class="swal2-input" value="${city.nombre}">
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    confirmButtonColor: '#124074',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    preConfirm: () => {
      const cityId = (document.getElementById('cityId') as HTMLInputElement).value;
      const cityName = (document.getElementById('cityName') as HTMLInputElement).value;
      this.cityService.editCity(cityId, cityName).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'En hora buena',
            text: 'Se actualizó la ciudad',
            iconColor: '#124074',
            confirmButtonColor: '#124074',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error
          });
        }
      );
    }
  });
}

showAddCityForm(): void {
  Swal.fire({
    title: 'Añadir ciudad',
    html: `
      <form [formGroup]="formCity">
        <input id="nombre" formControlName="nombre" class="swal2-input" placeholder="Nombre de la ciudad">
      </form>
    `,
    showCancelButton: true,
    confirmButtonText: 'Añadir',
    confirmButtonColor:'#0d6efd',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const cityName = (document.getElementById('nombre') as HTMLInputElement).value;
      if (!cityName ||cityName.length<3) {
        Swal.showValidationMessage('Por favor, ingresa un nombre válido de ciudad');
        return null;
      } else {
        return cityName;
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const cityName = result.value;
      this.postCity(cityName);
    }
  });
}
  
}




