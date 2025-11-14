import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SearchService } from '../../../core/services/search.state.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-search',
  imports: [CommonModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

 textValue = signal('');
 private searchService = inject(SearchService);


  onValueChange(value:string):void{
    this.searchService.setQuery(value);
   }

  onSearch(event:Event){
    const value = (event.target as HTMLInputElement).value;
    this.textValue.set(value);
    this.searchService.setQuery(value);

  }
  clear():void{
    this.textValue.set('');
    this.searchService.clear();

  }
 
  // query = signal('');
//NO SIRVE, YA QUE LA COMUNICACION CON EL ProductList no es directa, 
  //SE USA UN SERVICIO SearchService
  // @Output() search = new EventEmitter<string>();
  
  // onSearch(event: Event){
  //   const value = (event.target as HTMLInputElement).value;
  //   this.query.set(value);
  //   this.search.emit(value)
  //  }
   
  //  clear() {
  //   this.query.set('');
  //   this.search.emit('');
  // }



}
