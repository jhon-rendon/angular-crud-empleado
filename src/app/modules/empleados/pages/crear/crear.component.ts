import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import {Router} from '@angular/router';

import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../interfaces/empleado';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

    public formulario:FormGroup;
    public message:string = '';
  
    constructor( 
                private serviceEmpleados:EmpleadosService,
                private formBuilder: FormBuilder,
                private router:Router
               ) {

      this.formulario = this.formBuilder.group({
        identificacion: ['', Validators.required],
        nombre: ['', Validators.required],
        edad: [''],
        cargo:['']
      });
    }
   
    async crearEmpleado( ){

      let empleado: Empleado ;
      
      if ( this.formulario.valid )
      { 
          let empleado: Empleado  = {
          identification : this.formulario.get('identificacion')?.value,
          name           : this.formulario.get('nombre')?.value,
          age            : this.formulario.get('edad')?.value,
          position       : this.formulario.get('cargo')?.value
        }
         this.serviceEmpleados.crearEmpleado(  empleado )
         .subscribe( (resp):any => {
            
            this.message = 'El empleado se registro satisfactoriamente'
            console.log(resp)
            //this.router.navigate(['listar'],{ queryParams: { message: this.message } });//Redireccionar
            localStorage.setItem("message", this.message);
            this.router.navigate(['listar']);//Redireccionar
          },
          (error) => {
            console.log("Empleados error:",error);
            this.message = 'Error al registrar el empleado'
         },
         ()=>{
          
          });
         
      } 

      return;
    
    }

    
 
}
