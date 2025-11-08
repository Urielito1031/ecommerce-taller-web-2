import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '', redirectTo:'home',pathMatch: 'full'
  },
   { 
    path: 'home',
    loadChildren:() => 
      import('./shared/components/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'users',
    loadChildren:() => 
      import('./features/users/user.routes').then(m => m.USER_ROUTES)
  },

  { 
    path: 'products',
    loadChildren:() => 
      import('./features/products/products.routes').then(m => m.PRODUCT_ROUTES)
  },
  { 
    path: 'auth', 
    loadChildren: ()=>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'cart',
    loadChildren: ()=> 
      import('./features/cart/cart.routes').then(m => m.CART_ROUTES)
  },
  {
    path: '**', redirectTo: 'home'
  }
];
