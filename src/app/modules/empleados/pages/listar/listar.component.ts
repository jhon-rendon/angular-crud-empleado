import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public resp:any;

  constructor( private serviceEmpleados:EmpleadosService,
              private router:Router
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

  eliminarEmpleado( id:string ){

    /*this.serviceEmpleados.eliminarEmpleado( id )
    .subscribe( resp => {
         this.resp = resp;
      },
      (error) => {
        console.log("Empleados error:",error);
     },
     ()=>{
       if( this.resp.result === 'True'){
        console.log('true')
          this.listadoEmpleados = this.listadoEmpleados.filter( (emp :any) => emp.identification !== id )
       }
       this.message = this.resp.message
     });*/
     this.router.navigate(['eliminar/'+id]);//Redireccionar
  }

  editarEmpleado( id:string ){
    this.router.navigate(['editar/'+id]);//Redireccionar
  }


}
