import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

//const URLAPI = environment.URL;
const baseUrl  = 'spia-test/aguadulce';

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
    //return this.http.get(`${URLAPI}/employees`, { headers });
    return this.http.get(`${baseUrl}/employees`,{ headers });
  }

  /*registrar(persona: Persona) {
    return this.http.post(`${this.rutaApi}/registrarPersona.php`, persona);
  }

  actualizar(persona: Persona) {
    return this.http.put(`${this.rutaApi}/actualizar{
    "/spia-test/*": {
    "target": "http://localhost:8080",
    "secure": false,
    "logLevel": "debug"
   
    }
    }Persona.php`, persona);
  }

  eliminar(id: string | number) {
    return this.http.delete(`${this.rutaApi}/eliminarPersona.php?id=${id}`);
  }*/
}
