import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  query = signal('');
  
  setQuery(term:string){
    this.query.set(term.toLowerCase());
  };
  clear(){
    console.log('clear');
    this.query.set('');
  }
}
