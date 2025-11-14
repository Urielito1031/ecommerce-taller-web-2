import { Component, computed, inject } from '@angular/core';
import { ProductStateService } from '../../../core/services/product.state.service';
import { CategoriaStateService } from '../../../core/services/categoria.state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})

export class ProductFilterComponent  {


  private productService = inject(ProductStateService);
  private categoriaService = inject(CategoriaStateService);

  protected categorias = this.categoriaService.categorias;

  protected categoriaSeleccionadaId: number | null = null;

  protected precioMinimo: number | null = null;
  protected precioMaximo: number | null = null;


  
  ngOnInit(){
    console.log("ProductFilterComponent initialized");
    this.categoriaService.cargarCategorias();
    // preguntar si estan en local storage, 

  }

  filtrarPorCategoria(categoriaId: number) {
    this.productService.filtrarPorCategoria(categoriaId);
  }

  aplicarFiltro() {

      if (this.categoriaSeleccionadaId !== null) {
        this.filtrarPorCategoria(this.categoriaSeleccionadaId);
        // falta persistir en local storage
      }

  }

  actualizarPrecioMinimo(){
    console.log("entro al metodo actualizarPrecioMinimo con valor: ", this.precioMinimo);
    this.productService.setSignalPrecioMinimo(this.precioMinimo);
  }

  actualizarPrecioMaximo(){
    this.productService.setSignalPrecioMaximo(this.precioMaximo);
  }

  }
