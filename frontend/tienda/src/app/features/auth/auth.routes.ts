import { Routes } from "@angular/router";
import { LoginComponent } from "./containers/login/login.component";
import { RegisterComponent } from "./containers/register/register.component";



export const AUTH_ROUTES:Routes =[

  {path: 'login',component: LoginComponent},
  {path: 'register', component: RegisterComponent}

]