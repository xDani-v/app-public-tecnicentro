import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ToastComponent } from './components/toast/toast.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { MecanicoComponent } from './components/mecanico/mecanico.component';
import { RepuestosComponent } from './components/repuestos/repuestos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { PersonalComponent } from './components/personal/personal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ClientesComponent,
    EmpleadosComponent,
    ToastComponent,
    AdministradorComponent,
    MecanicoComponent,
    RepuestosComponent,
    ServiciosComponent,
    PersonalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
