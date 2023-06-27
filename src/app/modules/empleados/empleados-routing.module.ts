import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from 'src/app/shared/index/index.component';
import { CrearComponent } from './pages/crear/crear.component';
import { ListarComponent } from './pages/listar/listar.component';

const routes: Routes = [
    {
      path:'',
      component: IndexComponent,
      children:[
        {
          path:'listar',
          component:ListarComponent
        },
        {
          path:'crear',
          component:CrearComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
