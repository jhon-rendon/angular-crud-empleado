import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public listadoEmpleados: any = [];
  public message:string = '';
  public busqueda:string = '';

  constructor( private serviceEmpleados:EmpleadosService,
              private route: ActivatedRoute
             ){
  }

  ngOnInit(): void {
    this.listarEmpleados();

    if( localStorage.getItem("message")){
      this.message = localStorage.getItem("message") || '';
      localStorage.removeItem('message');
    }

  }
 

  listarEmpleados(){

    this.serviceEmpleados.getEmpleados() 
     .subscribe( resp => {
      this.listadoEmpleados = resp;
      console.log(resp)
      },
      (error) => {
        console.log("Empleados error:",error);
     },
     ()=>{
      console.log(this.listadoEmpleados.employees)
        this.listadoEmpleados = this.listadoEmpleados.employees
      });
  }

  buscarEmpleado(){
    this.message = '';

    if( this.busqueda.length === 0 ){
      this.listarEmpleados();
      return;
    }
    this.serviceEmpleados.getEmpleadoByIdentificacion( this.busqueda )
    .subscribe( resp => {
        
      this.listadoEmpleados = resp;
      },
      (error) => {
        console.log("Empleados error:",error);
     },
     ()=>{
      if( this.listadoEmpleados.result === 'True' ){
        let empleado =  this.listadoEmpleados.employee
        this.listadoEmpleados = [];
        this.listadoEmpleados[0] = empleado
        console.log('true')
        console.log(this.listadoEmpleados)
      }
      else{
        this.message = this.listadoEmpleados.message
        this.listadoEmpleados[0] = {};
        console.log('false')
      }
      
      });
  }


}
