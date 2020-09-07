import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  url = 'http://localhost:8080';

  constructor( private http: HttpClient) { }

  crearTarea( objeto: any ): any {
    return this.http.post(`${this.url}/tareas`, objeto ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  cargarTareas( ): any {
    return this.http.get(`${this.url}/tareas` ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  borrarTarea(id: string): any {
    return this.http.delete(`${this.url}/tareas/${id}` ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  cargarTarea(id: string): any {
    return this.http.get(`${this.url}/tareas/${id}` ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  actualizarTarea(id: string, parametros: any): any {
    return this.http.put(`${this.url}/tareas/${id}`, parametros).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

}
