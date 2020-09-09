import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-administrar-tareas',
  templateUrl: './administrar-tareas.component.html',
  styleUrls: ['./administrar-tareas.component.css']
})
export class AdministrarTareasComponent implements OnInit {

  tareas: any[];
  borradoStatus = false;
  loading = true;

  constructor(private tareasServicio: TareasService) {
    this.cargarTareas();
  }

  ngOnInit(): void {
  }

  async cargarTareas(): Promise<void> {
    const resp = await this.tareasServicio.cargarTareas();
    this.tareas = resp.tareas.filter( filtrado => {
      return filtrado.terminado === false;
    });
    this.loading = false;
    console.log(this.tareas);
  }

  async borrarTareas( id: string, index: number): Promise<void> {
    const resp = await this.tareasServicio.borrarTarea( id );
    if (resp.ok === true) {
      this.borradoStatus = true;
      console.log(resp, resp.ok);
    }
    this.tareas.splice( index, 1 );
  }

  filtrarDuracion(tipo: number): void{
    this.tareas.forEach( tarea => {
      tarea.minutos = tarea.minutos + tarea.segundos / 60;
    });
    if (tipo === 1) {
      console.log('ascendente');
      this.tareas.sort(((a, b) => a.minutos - b.minutos));
    } else {
      console.log('descendiente');
      this.tareas.sort(((a, b) => b.minutos - a.minutos));
    }
    this.tareas.forEach( tarea => {
      tarea.minutos = tarea.minutos - tarea.segundos / 60;
    });
  }

}
