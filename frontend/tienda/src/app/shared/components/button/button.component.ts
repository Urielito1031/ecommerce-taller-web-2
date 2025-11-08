import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  
  @Input() label = 'Boton';
  @Input() variant: 'primary' | 'secondary'|'success'| 'danger'| 'warning' = 'primary';
  @Input() size: 'sm'|'md'| 'lg' = 'md';
  @Input() icon?: string;
  @Input() disabled = false;
   
  @Output() clicked = new EventEmitter<void>();

  onClick(){
    if(!this.disabled){
      this.clicked.emit();
    }
  }

}
