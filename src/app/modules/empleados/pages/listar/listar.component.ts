import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public listadoEmpleados: any = [];

  constructor( private serviceEmpleados:EmpleadosService){
    console.log('iniciando listado')
  }

  ngOnInit(): void {

     this.serviceEmpleados.getEmpleados() 
     .subscribe( resp  => {
      this.listadoEmpleados = resp;
      console.log(resp)
      },
      (error) => {
        console.log("Empleados error:",error);
     },
     ()=>{
      
      });
  }


}
