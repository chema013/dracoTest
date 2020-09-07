import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { HomeComponent } from './components/home/home.component';
import { AdministrarTareasComponent } from './components/administrar-tareas/administrar-tareas.component';
import { EditarTareaComponent } from './components/editar-tarea/editar-tarea.component';
import { TimerComponent } from './components/timer/timer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'crear', component: CrearTareaComponent },
  { path: 'administrar', component: AdministrarTareasComponent },
  { path: 'administrar/editar/:id', component: EditarTareaComponent },
  { path: 'administrar/timer/:id', component: TimerComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
