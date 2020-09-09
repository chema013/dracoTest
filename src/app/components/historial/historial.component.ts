import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { FechasService } from '../../services/fechas.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  tareas: any[];
  todasTareas: any[];
  loading = true;
  DataGrafica: any;
  grafica = false;
  botonGrafica = 'Mostrar Grafica semanal';

  constructor( private tareasServicio: TareasService, private fechaServicio: FechasService ) {
    this.cargarTareas();
  }

  // *******************
  // grafica
  // *******************

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(127, 63, 191, 0.8)',
      borderColor: 'rgba(101, 5, 13, 1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Tareas Totales' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Tareas Completadas' }
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // *************************
  // extraccion de datos
  // *************************
  async cargarTareas(): Promise<void> {
    const resp = await this.tareasServicio.cargarTareas();
    this.todasTareas = resp.tareas;
    this.tareas = resp.tareas.filter( filtrado => {
      return filtrado.terminado === true;
    });
    this.loading = false;
    this.graficaSemanal();
    this.cargarGrafica();
    // console.log(this.tareas);
    // console.log(this.todasTareas);
  }

  cargarGrafica(): void {
    const data = [
      this.DataGrafica.domingo.total,
      this.DataGrafica.lunes.total,
      this.DataGrafica.martes.total,
      this.DataGrafica.miercoles.total,
      this.DataGrafica.jueves.total,
      this.DataGrafica.viernes.total,
      this.DataGrafica.sabado.total,
    ];
    this.barChartData[0].data = data;
    const data1 = [
      this.DataGrafica.domingo.completas,
      this.DataGrafica.lunes.completas,
      this.DataGrafica.martes.completas,
      this.DataGrafica.miercoles.completas,
      this.DataGrafica.jueves.completas,
      this.DataGrafica.viernes.completas,
      this.DataGrafica.sabado.completas,
    ];
    this.barChartData[1].data = data1;
  }

  graficaSemanal(): void{
    this.DataGrafica = this.fechaServicio.filtrarPorSemana(this.todasTareas);
  }

  ngOnInit(): void {
  }

  mostrargrafica(): void {
    this.grafica = !this.grafica;
    if (this.grafica) {
      this.botonGrafica = 'Ocultar Gráfica semanal';
    } else {
      this.botonGrafica = 'Mostrar Gráfica semanal';
    }
  }

}
