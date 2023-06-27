import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { CrearComponent } from './pages/crear/crear.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarComponent } from './pages/editar/editar.component';
import { EliminarComponent } from './pages/eliminar/eliminar.component';

@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
    EditarComponent,
    EliminarComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  
  ]
})
export class EmpleadosModule { }
