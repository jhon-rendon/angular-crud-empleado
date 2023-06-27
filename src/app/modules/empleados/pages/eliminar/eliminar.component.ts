import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent  implements OnInit{

  private resp:any;
  private paramsId:any;
  public empleado:any;

  constructor( 
    private serviceEmpleados:EmpleadosService,
    private router:Router,
    private rutaActiva: ActivatedRoute
   ) {

  }

  ngOnInit() {
    console.log(this.rutaActiva.snapshot.params['id']);
    this.paramsId = this.rutaActiva.snapshot.params['id'];
    if( !this.paramsId ){
      this.redieccionarPageListar()
    }

    this.listarEmpleadoById();
  }


  listarEmpleadoById( ){
    this.serviceEmpleados.getEmpleadoByIdentificacion( this.paramsId )
    .subscribe( resp => {
     this.empleado = resp;
     console.log(resp)
     },
     (error) => {
       console.log("Empleados error:",error);
    },
    ()=>{
      if( this.empleado.result === 'True'){

      }else{
       this.redieccionarPageListar()
      }
    });

 }

  eliminarEmpleado(  ){

    this.serviceEmpleados.eliminarEmpleado( this.paramsId )
    .subscribe( resp => {
         this.resp = resp;
      },
      (error) => {
        console.log("Empleados error:",error);
     },
     ()=>{
       
      let message = ( this.resp.result === 'True' )? 'El empleado se Elimino satisfactoriamente': 'Error al eliminar el empleado';
      localStorage.setItem("message", message);
      this.redieccionarPageListar()
      
     });
  }


  redieccionarPageListar(){
    this.router.navigate(['listar']);//Redireccionar
  }
}
