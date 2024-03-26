import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosapiService {

  private url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  //servicios de clientes
  getClientes(): Observable<any> {
    return this.http.get(this.url + "clientes");
  }

  getCliente(id: number): Observable<any> {
    return this.http.get(`${this.url}clientes/${id}`);
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post(this.url + "clientes", cliente);
  }

  updateCliente(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.url}clientes/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.url}clientes/${id}`);
  }

  //servicios de empleados
  getEmpleados(): Observable<any> {
    return this.http.get(this.url + "empleados");
  }

  getEmpleado(id: number): Observable<any> {
    return this.http.get(`${this.url}empleados/${id}`);
  }

  createEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.url + "empleados", empleado);
  }

  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put(`${this.url}empleados/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.url}empleados/${id}`);
  }

  //servicios de administradores
  getAdministradores(): Observable<any> {
    return this.http.get(this.url + "administradores");
  }

  getAdministrador(id: number): Observable<any> {
    return this.http.get(`${this.url}administradores/${id}`);
  }

  createAdministrador(administrador: any): Observable<any> {
    return this.http.post(this.url + "administradores", administrador);
  }

  updateAdministrador(id: number, administrador: any): Observable<any> {
    return this.http.put(`${this.url}administradores/${id}`, administrador);
  }

  deleteAdministrador(id: number): Observable<any> {
    return this.http.delete(`${this.url}administradores/${id}`);
  }
  //servicios mecanicos
  getMecanicos(): Observable<any> {
    return this.http.get(this.url + "mecanico");
  }

  getMecanico(id: number): Observable<any> {
    return this.http.get(`${this.url}mecanico/${id}`);
  }

  createMecanico(mecanico: any): Observable<any> {
    return this.http.post(this.url + "mecanico", mecanico);
  }

  updateMecanico(id: number, mecanico: any): Observable<any> {
    return this.http.put(`${this.url}mecanico/${id}`, mecanico);
  }

  deleteMecanico(id: number): Observable<any> {
    return this.http.delete(`${this.url}mecanico/${id}`);
  }
  //servicios de horarios
  getHorarios(): Observable<any> {
    return this.http.get(this.url + "horarios");
  }

  getHorario(id: number): Observable<any> {
    return this.http.get(`${this.url}horarios/${id}`);
  }

  createHorario(horario: any): Observable<any> {
    return this.http.post(this.url + "horarios", horario);
  }

  updateHorario(id: number, horario: any): Observable<any> {
    return this.http.put(`${this.url}horarios/${id}`, horario);
  }

  deleteHorario(id: number): Observable<any> {
    return this.http.delete(`${this.url}horarios/${id}`);
  }
  //servicios de servicios
  getServicios(): Observable<any> {
    return this.http.get(this.url + "servicios");
  }

  getServicio(id: number): Observable<any> {
    return this.http.get(`${this.url}servicios/${id}`);
  }

  createServicio(servicio: any): Observable<any> {
    return this.http.post(this.url + "servicios", servicio);
  }

  updateServicio(id: number, servicio: any): Observable<any> {
    return this.http.put(`${this.url}servicios/${id}`, servicio);
  }

  deleteServicio(id: number): Observable<any> {
    return this.http.delete(`${this.url}servicios/${id}`);
  }
  //servicios del personal
  getPersonal(): Observable<any> {
    return this.http.get(this.url + "personal");
  }

  getPersona(id: number): Observable<any> {
    return this.http.get(`${this.url}personal/${id}`);
  }

  createPersona(persona: any): Observable<any> {
    return this.http.post(this.url + "personal", persona);
  }

  updatePersona(id: number, persona: any): Observable<any> {
    return this.http.put(`${this.url}personal/${id}`, persona);
  }

  deletePersona(id: number): Observable<any> {
    return this.http.delete(`${this.url}personal/${id}`);
  }

  getServiciosByIdPersonal(id_personal: number): Observable<any> {
    return this.http.get<any>(`${this.url}personal/ps/${id_personal}`);
  }

  //relaciones de servicios con personal
  getPs_sById(id: number): Observable<any> {
    return this.http.get(`${this.url}ps_s/${id}`);
  }

  createPs_s(ps_s: any): Observable<any> {
    return this.http.post(this.url + "ps_s", ps_s);
  }

  updatePs_s(id: number, ps_s: any): Observable<any> {
    return this.http.put(`${this.url}ps_s/${id}`, ps_s);
  }

  deletePs_s(id_personal: number, id_servicio: number): Observable<any> {
    return this.http.delete(`${this.url}ps_s/${id_personal}/${id_servicio}`);
  }
  //vehiculos rutes

}
