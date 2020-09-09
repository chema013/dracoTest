import { Injectable } from '@angular/core';

interface TareasCompletadas {
  lunes: {
    total: number;
    completas: number;
  };
  martes: {
    total: number;
    completas: number;
  };
  miercoles: {
    total: number;
    completas: number;
  };
  jueves: {
    total: number;
    completas: number;
  };
  viernes: {
    total: number;
    completas: number;
  };
  sabado: {
    total: number;
    completas: number;
  };
  domingo: {
    total: number;
    completas: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  tareasC: TareasCompletadas;

  constructor() { }

  filtrarPorSemana( tareas: any[] ): TareasCompletadas{
    const ahora = new Date();
    const diaHoy = ahora.getDate();
    const filtrados = tareas.filter ( tarea => {
      if (ahora.getMonth() + 1 - tarea.fecha.month === 0 || ahora.getMonth() + 1 - tarea.fecha.month === 1 ) {
        return (diaHoy - tarea.fecha.day <= 7 && diaHoy - tarea.fecha.day >= 0);
      }
    });
    this.getGrafica(filtrados);
    console.log(this.tareasC);
    console.log(filtrados);
    return this.tareasC;
  }

  getGrafica(tareas: any[]): void {
    this.limpiarData();
    tareas.forEach( tarea => {
      const fecha = new Date( `${tarea.fecha.year}-${tarea.fecha.month}-${tarea.fecha.day}` );
      console.log(fecha.getDay());
      switch (fecha.getDay()) {
        case 0 :
          if (tarea.terminado) {
            this.tareasC.domingo.completas += 1;
          }
          this.tareasC.domingo.total += 1;
          break;
        case 1 :
          if (tarea.terminado) {
            this.tareasC.lunes.completas += 1;
          }
          this.tareasC.lunes.total += 1;
          break;
        case 2 :
          if (tarea.terminado) {
            this.tareasC.martes.completas += 1;
          }
          this.tareasC.martes.total += 1;
          break;
        case 3 :
          if (tarea.terminado) {
            this.tareasC.miercoles.completas += 1;
          }
          this.tareasC.miercoles.total += 1;
          break;
        case 4 :
          if (tarea.terminado) {
            this.tareasC.jueves.completas += 1;
          }
          this.tareasC.jueves.total += 1;
          break;
        case 5 :
          if (tarea.terminado) {
            this.tareasC.viernes.completas += 1;
          }
          this.tareasC.viernes.total += 1;
          break;
        case 6 :
          if (tarea.terminado) {
            this.tareasC.sabado.completas += 1;
          }
          this.tareasC.sabado.total += 1;
          break;
        default:
          break;
      }
    });
    // return this.tareasC;
  }

  limpiarData(): void {
    this.tareasC = {
      lunes: {
        total: 0,
        completas: 0,
      },
      martes: {
        total: 0,
        completas: 0,
      },
      miercoles: {
        total: 0,
        completas: 0,
      },
      jueves: {
        total: 0,
        completas: 0,
      },
      viernes: {
        total: 0,
        completas: 0,
      },
      sabado: {
        total: 0,
        completas: 0,
      },
      domingo: {
        total: 0,
        completas: 0,
      },
    };
  }

  getUltimaSemana( tareas: any[] ): void {
    const invertido = tareas.reverse();
    let bandera = false;
    let dia = 0;
    let mes = 0;
    let validaMes = false;
    const filtrados = invertido.filter( tarea => {
      const fecha = new Date( `${tarea.fecha.year}-${tarea.fecha.month}-${tarea.fecha.day}` );
      if ( fecha.getDay() === 6 ){
        bandera = !bandera;
        dia = fecha.getDate();
        mes = fecha.getMonth();
      }
      validaMes = fecha.getMonth() - mes === 0 || fecha.getMonth() - mes === 1;
      if (bandera && fecha.getDate() - dia < 7 && validaMes) {
        return tarea;
      }
    });
    console.log('filtrados' , filtrados);
    this.getGrafica(filtrados);
    console.log(this.tareasC);
  }

}
