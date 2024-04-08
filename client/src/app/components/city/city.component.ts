import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city/city.service';
import { City } from '../../interfaces/city';

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
  itemsPerPage: number = 10; // Cantidad de elementos por página

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
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
    // Reiniciar a la primera página cuando se realice una nueva búsqueda
    this.currentPage = 0;
  }

  editCity(city: City): void {
    // Implementa tu lógica de edición aquí
  }


  
}



