import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarTareasComponent } from './administrar-tareas.component';

describe('AdministrarTareasComponent', () => {
  let component: AdministrarTareasComponent;
  let fixture: ComponentFixture<AdministrarTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
