import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  
  label = input<string>('Boton');
  variant = input<'primary' | 'secondary' | 'success' | 'danger' | 'warning'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  icon = input<string | undefined>(undefined);
  disabled = input<boolean>(false);
   
  clicked = output<void>();

  onClick(){
    if(!this.disabled()){
      this.clicked.emit();
    }
  }

}
