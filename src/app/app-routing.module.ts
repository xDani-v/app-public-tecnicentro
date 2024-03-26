import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { MecanicoComponent } from './components/mecanico/mecanico.component';
import { RepuestosComponent } from './components/repuestos/repuestos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { PersonalComponent } from './components/personal/personal.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { FacturasComponent } from './components/facturas/facturas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'clientes', component: ClientesComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'administradores', component: AdministradorComponent },
      { path: 'mecanicos', component: MecanicoComponent },
      { path: 'repuestos', component: RepuestosComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: 'horarios', component: HorariosComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'vehiculos', component: VehiculosComponent },
      { path: 'facturas', component: FacturasComponent },

    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
