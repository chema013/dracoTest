import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../environments/environment';


interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  // url = 'http://localhost:8080';

  constructor( private http: HttpClient) { }

  crearTarea( objeto: any ): any {
    return this.http.post(`${url}/tareas`, objeto ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  cargarTareas( ): any {
    return this.http.get(`${url}/tareas` ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  borrarTarea(id: string): any {
    return this.http.delete(`${url}/tareas/${id}` ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  cargarTarea(id: string): any {
    return this.http.get(`${url}/tareas/${id}` ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  actualizarTarea(id: string, parametros: any): any {
    return this.http.put(`${url}/tareas/${id}`, parametros).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  preCargarBase(): any {
    return this.http.get(`${url}/precargar` ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  restaTiempo(inicial: Time, final: Time): Time {
    const resta: Time = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    if (final.seconds > inicial.seconds) {
      inicial.minutes -= 1;
      inicial.seconds += 60;
    }
    resta.seconds = inicial.seconds - final.seconds;
    if (final.minutes > inicial.minutes) {
      inicial.hours -= 1;
      inicial.minutes += 60;
    }
    resta.minutes = inicial.minutes - final.minutes;
    resta.hours = inicial.hours - final.hours;
    return resta;
  }

}
