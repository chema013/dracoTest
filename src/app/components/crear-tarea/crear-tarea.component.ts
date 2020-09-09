import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PrecargarbaseService } from '../../services/precargarbase.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {

  model: NgbDateStruct;
  forma: FormGroup;
  personalizado = false;
  selecccionado = false;
  habilitaBoton = false;
  creadoStatus = false;
  precargadoStatus = false;
  textoAlerta = '';

  constructor( private tareasServicio: TareasService,
               private fb: FormBuilder,
               private router: Router) {
    this.crearFormulario();
  }

  get fechaNoValido(): boolean {
    return this.forma.get('fecha').invalid && this.forma.get('fecha').touched;
  }

  get selNoValido(): boolean {
    return this.forma.get('selectorDuracion').invalid && this.forma.get('selectorDuracion').touched;
  }

  get minutosNoValido(): boolean {
    return this.forma.get('minutos').invalid && this.forma.get('minutos').touched;
  }

  get segundosNoValido(): boolean {
    return this.forma.get('segundos').invalid && this.forma.get('segundos').touched;
  }

  get tituloNoValido(): boolean {
    return this.forma.get('titulo').invalid && this.forma.get('titulo').touched;
  }

  get descripcionNoValido(): boolean {
    return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched;
  }

  get duracionNoValido(): boolean {
    return this.forma.get('duracion').invalid && this.forma.get('duracion').touched;
  }

  get selectorNoValido(): boolean {
    return this.forma.get('selector').invalid && this.forma.get('selector').touched;
  }

  ngOnInit(): void {
  }

  crearFormulario(): void {
    this.forma = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1)] ],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      minutos: ['', [ Validators.max(120), Validators.min(0) ] ],
      segundos: ['', [ Validators.max(60), Validators.min(0) ]],
      fecha: ['', Validators.required ],
      creacion: [''],
      terminado: [''],
      duracion: [''],
      selector: ['', Validators.required],
      selectorDuracion: ['']
    });
  }

  onSelect( valor: any ): void{
    this.habilitaBoton = true;
    switch (valor) {
      case 'sel':
        this.selecccionado = true;
        this.personalizado = false;
        break;
        case 'per':
          this.selecccionado = false;
          this.personalizado = true;
          break;
      default:
        console.log('Error de envio');
        break;
    }
  }

  crearTarea(): void {
    console.log( this.forma );
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
    switch (this.forma.value.selectorDuracion) {
      case 'corta':
        this.forma.value.minutos = 30;
        this.forma.value.segundos = 0;
        break;
        case 'media':
          this.forma.value.minutos = 60;
          this.forma.value.segundos = 0;
          break;
          case 'larga':
            this.forma.value.minutos = 120;
            this.forma.value.segundos = 0;
            break;
          }
    this.forma.value.creacion = Date();
    this.forma.value.terminado = false;
    this.forma.value.duracion = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.tareasServicio.crearTarea(this.forma.value);
    this.forma.reset();
    this.creadoStatus = true;
    this.textoAlerta = 'Tarea Creada exitosamente';
    // this.router.navigate(['/administrar']);
  }

  HabilitaB(): void {
    this.habilitaBoton = false;
  }

  precargar(): void {
    this.tareasServicio.preCargarBase();
    this.precargadoStatus = true;
    this.textoAlerta = 'Precargado realizado exitosamente';
  }

}
