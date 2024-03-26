import { Component, OnInit } from '@angular/core';
import { ServiciosapiService } from 'src/app/services/serviciosapi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  //operaciones del modal
  modalOpen = false;
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
  }

  //operaciones de datos
  servicios: any[] = [];
  servicio: any = {};
  constructor(private servicioapi: ServiciosapiService, private toast: ToastService) { }

  ngOnInit(): void {
    this.listaservicios();
  }

  onSubmit() {
    if (this.servicio.id) {
      this.modificarservicio(this.servicio.id, this.servicio);
    } else {
      this.insertarservicio(this.servicio);
    }
    this.servicio = {}; // Limpia el formulario después de insertar o modificar
    this.closeModal();
  }

  listaservicios() {
    this.servicioapi.getServicios().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  insertarservicio(servicio: any) {
    this.servicioapi.createServicio(servicio).subscribe(
      response => {
        this.listaservicios();
        this.toast.show('success', 'servicio insertado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al insertar el servicio');
      }
    );
  }

  cargarservicio(servicio: any) {
    this.servicio = Object.assign({}, servicio);
    this.openModal();
  }

  modificarservicio(id: number, servicio: any) {
    this.servicioapi.updateServicio(id, servicio).subscribe(
      response => {
        this.listaservicios();
        this.toast.show('success', 'servicio modificado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al modificar el servicio');
      }
    );
  }

  eliminarservicio(servicio: any) {
    this.toast.show('confirmation', '¿Estás seguro?', () => {
      this.servicioapi.deleteServicio(servicio.id).subscribe(
        response => {
          this.toast.show('success', 'servicio eliminado correctamente');
          this.listaservicios();
        },
        error => {
          this.toast.show('danger', 'Error al eliminar el servicio');
        }
      );
    });
  }
}
