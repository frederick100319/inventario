import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../interfaces/category';
import { HomeService } from '../../services/home/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  category: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  currentPage: number = 0; // Página actual
  itemsPerPage: number = 5; // Cantidad de elementos por página
  totalCategories:number=0
  applyAnimation = false;
  constructor( private categoryService: CategoryService, private homeService:HomeService) { }


  ngOnInit(): void {
    this.homeService.getTotalCategories().subscribe(
      (totalCategories: number) => {
        this.totalCategories = totalCategories;
      },
      (error) => {
        console.error('Error fetching total cities:', error);
      }
    );

    this.categoryService.getCategories().subscribe(
      (category: Category[]) => {
        console.log(category)
        this.category = category.sort((a, b) => a.id_categoria - b.id_categoria);
        this.filteredCategories = [...category];
      },
      (error) => {
        console.error('Error al obtener ciudades:', error);
      }
    );
  }
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCategories = [...this.category];
    } else {
      this.filteredCategories= this.category.filter(category =>
        category.nombre.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    this.currentPage = 0;
  }

  editCity(category: any) {
    Swal.fire({
      title: 'Editar categoría',
      html: `
        <label for="cityId">ID de la categoría:</label>
        <input type="text" id="categoryID" class="swal2-input" value="${category.id_categoria}" disabled>
        <label for="cityName">Nombre de la categoría:</label>
        <input type="text" id="categoryName" class="swal2-input" value="${category.nombre}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#124074',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const categoryId = (document.getElementById('categoryID') as HTMLInputElement).value;
        const categoryName = (document.getElementById('categoryName') as HTMLInputElement).value;
        this.categoryService.editCategory(categoryId, categoryName).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'En hora buena',
              text: 'Se actualizó la categoría',
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
    const maxPage = Math.ceil(this.filteredCategories.length / this.itemsPerPage) - 1;
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.applyAnimation = true;
      setTimeout(() => {
        this.applyAnimation = false;
      }, 500);
    }
  }

getCategoriesForPage(): Category[] {
  const startIndex = this.currentPage * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredCategories.length);
  return this.filteredCategories.slice(startIndex, endIndex);
}

getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.filteredCategories.length / this.itemsPerPage);
  return Array.from({ length: pageCount }, (_, i) => i + 1);
}

postCategory(nombre: string): void {
  this.categoryService.postCategory(nombre).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'En hora buena',
        text: 'Se añadio nueva categoría a la lista',
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


showAddCategoryForm(): void {
  Swal.fire({
    title: 'Añadir categoría',
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
      const categoryName = (document.getElementById('nombre') as HTMLInputElement).value;
      if (!categoryName ||categoryName.length<3) {
        Swal.showValidationMessage('Por favor, ingresa un nombre válido de categoría');
        return null;
      } else {
        return categoryName;
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const categoryName = result.value;
      this.postCategory(categoryName);
    }
  });
}
}
