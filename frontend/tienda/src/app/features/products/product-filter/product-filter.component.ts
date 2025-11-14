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

    // Recuperar TODOS los filtros de localStorage
    const cat = localStorage.getItem('filtro_categoria');
    this.categoriaSeleccionadaId = cat ? Number(cat) : null;

    const min = localStorage.getItem('filtro_precio_minimo');
    this.precioMinimo = min ? Number(min) : null;

    const max = localStorage.getItem('filtro_precio_maximo');
    this.precioMaximo = max ? Number(max) : null;

    // 2. Aplicar filtros de PRECIO al estado (para el computed signal)
    // Esto es síncrono y no causa problemas.
    if (this.precioMinimo !== null)
      this.productService.setSignalPrecioMinimo(this.precioMinimo);
    if (this.precioMaximo !== null)
      this.productService.setSignalPrecioMaximo(this.precioMaximo);

    // 3. Decidir QUÉ lista de productos cargar (ESTA ES LA PARTE CLAVE)
    if (this.categoriaSeleccionadaId !== null) {
      // Si hay categoría, cargar la lista filtrada por categoría
      this.productService.filtrarPorCategoria(this.categoriaSeleccionadaId);
    } else {
      // Si NO hay categoría, cargar la lista completa
      this.productService.loadProducts();
    }

  }

  filtrarPorCategoria(categoriaId: number) {
    this.productService.filtrarPorCategoria(categoriaId);
  }

  aplicarFiltro() {
      if (this.categoriaSeleccionadaId !== null) 
        this.filtrarPorCategoria(this.categoriaSeleccionadaId);
  }

  actualizarPrecioMinimo(){
    this.productService.setSignalPrecioMinimo(this.precioMinimo);
  }

  actualizarPrecioMaximo(){
    this.productService.setSignalPrecioMaximo(this.precioMaximo);
  }

  }
