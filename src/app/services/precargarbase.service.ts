import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../environments/environment';

interface Tarea {
  _id: number;
  titulo: string;
  descripcion: string;
  fecha: Fecha;
  minutos: number;
  segundos: number;
  creacion: Date;
  duracion: Duracion;
  terminado: boolean;
}

interface Fecha {
  year: number;
  month: number;
  day: number;
}

interface Duracion {
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class PrecargarbaseService {

  titulos = [
    'Titulo 1', 'Titulo 3', 'Titulo 5', 'Titulo 7', 'Titulo 9',
    'Titulo 2', 'Titulo 4', 'Titulo 6', 'Titulo 8', 'Titulo 10'
  ];

  descripciones = [
    'Esta es la descripcion de una tarea de ejemplo 1', 'Esta es la descripcion de una tarea de ejemplo 4',
    'Esta es la descripcion de una tarea de ejemplo 7', 'Esta es la descripcion de una tarea de ejemplo 9',
    'Esta es la descripcion de una tarea de ejemplo 2', 'Esta es la descripcion de una tarea de ejemplo 5',
    'Esta es la descripcion de una tarea de ejemplo 8', 'Esta es la descripcion de una tarea de ejemplo 10',
    'Esta es la descripcion de una tarea de ejemplo 3', 'Esta es la descripcion de una tarea de ejemplo 6',
  ];

  minutos = [120, 35, 60, 15, 40, 30, 25, 90, 12, 5];
  segundos = [50, 45, 10, 15, 20, 35, 25, 10, 12, 8];
  duracion: Duracion[];
  fecha: Fecha[];
  hoy = new Date();
  tareas = new Array();

  constructor( private http: HttpClient ) { }

  crearTarea( objeto: any ): any {
    return this.http.post(`${url}/tareas`, objeto ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  generaAleaorios(): Tarea[] {
    this.tareas = new Array();
    for (let i = 0; i < 50; i++) {
      const numAleatorio = Math.floor(Math.random() * (10 - 0));
      const tarea: Tarea = {
        _id: i,
        titulo: this.titulos[numAleatorio],
        descripcion: this.descripciones[numAleatorio],
        fecha: this.generaFecha(),
        minutos: Math.floor(Math.random() * (120 - 0) ),
        segundos: Math.floor(Math.random() * (60 - 0) ),
        creacion: this.hoy,
        duracion: this.getDuracion(),
        terminado: true,
      };
      console.log(tarea);
      this.tareas.push(tarea);
    }
    return this.tareas;
  }

  generaFecha(): Fecha {
    const n = Math.floor(Math.random() * (8) );
    const fecha: Fecha = {
      day: this.hoy.getDate() - n,
      month: this.hoy.getMonth() + 1,
      year: this.hoy.getFullYear(),
    };
    return fecha;
  }

  getDuracion(): Duracion {
    const duracion: Duracion = {
      hours: Math.floor(Math.random() * (2) ),
      minutes: Math.floor(Math.random() * (60 - 1) ) + 1,
      seconds: Math.floor(Math.random() * (60 - 1) ) + 1,
    };
    return duracion;
  }

}
