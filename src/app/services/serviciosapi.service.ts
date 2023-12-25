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
}
