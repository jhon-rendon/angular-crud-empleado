import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

    public formulario:FormGroup;

    constructor( private formBuilder: FormBuilder ) {
      this.formulario = formBuilder.group({
        identificacion: ['', Validators.required],
        nombre: ['', Validators.required],
      });
    }


   
    crearEmpleado( form:any ){

    }
}
