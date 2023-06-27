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
  public messageRegistro:string = '';

  constructor( private serviceEmpleados:EmpleadosService,
              private route: ActivatedRoute
             ){
  }

  ngOnInit(): void {
    this.listarEmpleados();

    ///Obtener Mensaje del registro, del parametro enviado por url
    /*this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.messageRegistro = params['message'];
        console.log(this.messageRegistro);
      }
    );*/
    if( localStorage.getItem("message")){
      this.messageRegistro = localStorage.getItem("message") || '';
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
      
      });
  }


}
