import { Component ,OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import {Router ,ActivatedRoute } from '@angular/router';


import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../interfaces/empleado';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent  implements OnInit  {


  public formulario:FormGroup;
  public message:string  = '';
  public paramsId:string = '';
  public empleado:any    = {};
  public resp:any;
  
    constructor( 
                private serviceEmpleados:EmpleadosService,
                private formBuilder: FormBuilder,
                private router:Router,
                private rutaActiva: ActivatedRoute
               ) {

      this.formulario = this.formBuilder.group({
        identificacion: ['', Validators.required],
        nombre: ['', Validators.required],
        edad: [''],
        cargo:['']
      });
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

            this.formulario = this.formBuilder.group({
              identificacion: [ this.empleado.employee.identification, Validators.required],
              nombre: [this.empleado.employee.name, Validators.required],
              edad: [this.empleado.employee.age],
              cargo:[this.empleado.employee.position]
            });
         }else{
          this.redieccionarPageListar()
         }
       });

    }
   
    async crearOEditarEmpleado( ){

      let empleado: Empleado ;
      
      if ( this.formulario.valid )
      { 
          let empleado: Empleado  = {
          identification : this.formulario.get('identificacion')?.value,
          name           : this.formulario.get('nombre')?.value,
          age            : this.formulario.get('edad')?.value,
          position       : this.formulario.get('cargo')?.value
        }

        this.serviceEmpleados.getEmpleadoByIdentificacion( this.paramsId )
        .subscribe( resp => {
           this.resp = resp
         },
         (error) => {
           console.log("Empleados error:",error);
        },
        ()=>{
          if( this.resp.result === 'True'){
              //Actualizar
             this.serviceEmpleados.editarEmpleado( this.formulario.get('identificacion')?.value, empleado)
             .subscribe( (resp):any => {
                 
              this.message = 'El empleado se Actualizo satisfactoriamente'
              console.log(resp)
              localStorage.setItem("message", this.message);
              this.redieccionarPageListar()
            },
            (error) => {
              console.log("Empleado, error:",error);
              this.message = 'Error al actualizar el empleado'
           },
           ()=>{
            
            });
          }else{
              //Crear
              this.serviceEmpleados.crearEmpleado(  empleado )
              .subscribe( (resp):any => {
                 
                 this.message = 'El empleado se Registro satisfactoriamente'
                 console.log(resp)
                 localStorage.setItem("message", this.message);
                 this.redieccionarPageListar()
               },
               (error) => {
                 console.log("Empleado, error:",error);
                 this.message = 'Error al registrar el empleado'
              },
              ()=>{
               
               });
            }
        });
        
         
      } 

      return;
    
    }

    redieccionarPageListar(){
      this.router.navigate(['listar']);//Redireccionar
    }

}
