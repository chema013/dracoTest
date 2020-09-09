import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as countdown from 'countdown';
import { isString } from 'util';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute } from '@angular/router';


interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  inicial: Time = null;
  time: Time = null;
  timerId: number = null;
  date: Date | string;
  tarea: any;
  loading: boolean;
  disabledPlay: boolean;
  deshabilitaTodo: boolean;
  pausar = false;

  alerts: Alert[] = [{
    type: 'success',
    message: 'Tarea finalizada, tiempo agotado.',
  }];

  constructor(private tareasServicio: TareasService, private activatedRoute: ActivatedRoute) {
    let id: string;
    this.activatedRoute.paramMap.subscribe(params => {
      id = params.get('id');
      this.cargarTarea(id);
    });
  }

  async cargarTarea( id: string): Promise<void> {
    this.loading = true;
    const resp = await this.tareasServicio.cargarTarea( id );
    if (resp.ok === true) {
      this.tarea = resp.tarea;
      this.cargarTimer();
      this.loading = false;
    }
  }

  cargarTimer(): void {
    let hora = 0;
    let min = 0;
    if (this.tarea.minutos > 59){
      hora = Math.trunc(this.tarea.minutos / 60);
      min = this.tarea.minutos % 60;
    }else{
      min = this.tarea.minutos;
    }
    this.time = {
      hours: hora,
      minutes: min,
      seconds: this.tarea.segundos
    };
    this.inicial = this.time;
  }

  temporizador( ): void {
    if (isString(this.date)){
      this.date = new Date(this.date);
    }
    this.disabledPlay = true;
    this.timerId = countdown(this.date, (ts) => {
      if ( this.time.hours === 0 && this.time.minutes === 0 && this.time.seconds === 0) {
        clearInterval(this.timerId);
        this.deshabilitaTodo = true;
        this.tareaCompletada(this.tarea._id);
        this.time = {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      } else {
        this.time = ts;
      }
    }, countdown.HOURS | countdown.MINUTES | countdown.SECONDS );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if ( this.timerId ){
      clearInterval(this.timerId);
    }
  }

  play(): void {
    const ahora = new Date();
    const hours = ahora.getHours();
    const minutes = ahora.getMinutes();
    const seconds = ahora.getSeconds();
    ahora.setHours(hours + this.time.hours);
    ahora.setMinutes(minutes + this.time.minutes);
    ahora.setSeconds(seconds + this.time.seconds);

    this.date = ahora;
    this.temporizador();
  }

  iniciar(): void {
    this.pausar = false;
    this.play();
  }

  restart(): void {
    this.pausar = true;
    this.disabledPlay = false;
    clearInterval(this.timerId);
    this.cargarTimer();
  }

  pausarf(): void {
    this.pausar = !this.pausar;
    if (this.pausar) {
      console.log(this.time);
      clearInterval(this.timerId);
    } else {
      this.play();
    }
  }

  tareaCompletada( id: string ): void {
    clearInterval(this.timerId);
    this.deshabilitaTodo = true;
    const duraciont = this.tareasServicio.restaTiempo(this.inicial, this.time);
    this.tareasServicio.actualizarTarea( id, { terminado: true, duracion: duraciont } );
  }

  close(alert: Alert): void {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
