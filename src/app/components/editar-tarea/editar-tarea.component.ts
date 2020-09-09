import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {

  forma: FormGroup;
  tarea: any;
  personalizado = false;
  selecccionado = false;
  habilitaBoton = false;

  constructor( private tareasServicio: TareasService,
               private fb: FormBuilder,
               private activatedRoute: ActivatedRoute,
               private router: Router){
    let id: string;
    this.activatedRoute.paramMap.subscribe(params => {
          id = params.get('id');
          this.cargarTarea(id);
    });
    this.crearFormulario();
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
      titulo: [''],
      descripcion: ['', [Validators.required, Validators.minLength(1)] ],
      minutos: ['', [ Validators.max(120), Validators.min(0)] ],
      segundos: ['', [ Validators.max(60), Validators.min(0)]],
      creacion: [''],
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

  cargarDataAlFormulario( data: any): void{
    this.forma.reset({
      titulo: this.tarea.titulo,
      descripcion: this.tarea.descripcion
    });
  }

  async cargarTarea( id: string): Promise<void> {
    const resp = await this.tareasServicio.cargarTarea( id );
    if (resp.ok === true) {
      this.tarea = resp.tarea;
    }
    this.cargarDataAlFormulario( this.tarea );
  }

  actualizar(): void{
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
    this.forma.value.titulo = this.tarea.titulo;
    this.tareasServicio.actualizarTarea(this.tarea._id, this.forma.value);
    this.router.navigate(['/administrar']);
  }

  HabilitaB(): void {
    this.habilitaBoton = false;
  }

}
