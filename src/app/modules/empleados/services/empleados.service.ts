import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Empleado } from '../interfaces/empleado';

//const URLAPI = environment.URL;
const baseUrl  = environment.URL_PROXI_CORS;

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {


  constructor(private http:HttpClient) { }


  getEmpleados() {
    return this.http.get(`${baseUrl}/employees`,{ headers });
  }

  crearEmpleado( datos: Empleado ){
    console.log(datos)
    return this.http.post<Empleado>(`${baseUrl}/employee`,{ "employee": datos },{ headers} );
  }

  getEmpleadoByIdentificacion( id:string ) {
    console.log('busqueda '+id)
    return this.http.get(`${baseUrl}/employee/${id}`,{ headers });
  }

}
