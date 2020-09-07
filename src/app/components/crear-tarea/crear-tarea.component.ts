import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {

  forma: FormGroup;
  personalizado = false;

  constructor( private tareasServicio: TareasService,
               private fb: FormBuilder) {
                 this.crearFormulario();
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

  ngOnInit(): void {
  }

  crearFormulario(): void {
    this.forma = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1)] ],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      minutos: ['', [ Validators.max(120), Validators.min(0)] ],
      segundos: ['', [ Validators.max(60), Validators.min(0)]],
      creacion: [''],
      selector: ['']
    });
  }

  crearTarea(): void {
    console.log( this.forma );
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
    switch (this.forma.value.selector) {
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
    console.log( this.forma );
    this.tareasServicio.crearTarea(this.forma.value);
  }

}
