import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../../core/services/product.state.service';
import { CategoriaStateService } from '../../../core/services/categoria.state.service';

@Component({
  selector: 'app-product-filter',
  imports: [],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})

export class ProductFilterComponent  {


  private productService = inject(ProductStateService);
  private categoriaService = inject(CategoriaStateService);

  protected categorias = this.categoriaService.categorias;





  ngOnInit(){
    console.log("ProductFilterComponent initialized");
    this.categoriaService.cargarCategorias();

  }

  filtrarPorCategoria(categoriaId: number) {
    this.productService.filtrarPorCategoria(categoriaId);
  }

// aplicarFiltro() {
// throw new Error('Method not implemented.');
// }

}
