import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [

  {
    path:'',
    loadChildren:() => import('./modules/empleados/empleados.module').then( m => m.EmpleadosModule )
  },
  {
    path:'404',
    component: ErrorPageComponent
  },
  
  {
    path: '**',
    redirectTo: '404'
  }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
