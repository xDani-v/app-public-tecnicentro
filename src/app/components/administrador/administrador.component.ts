import { Component, OnInit } from '@angular/core';
import { ServiciosapiService } from 'src/app/services/serviciosapi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  //operaciones del modal
  modalOpen = false;
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
  }

  //operaciones de datos
  administradores: any[] = [];
  empleados: any[] = [];
  administrador: any = {};
  constructor(private servicio: ServiciosapiService, private toast: ToastService) { }

  ngOnInit(): void {
    this.listaadministradores();

  }

  onSubmit() {
    if (this.administrador.id) {
      this.modificaradministrador(this.administrador.id, this.administrador);
    } else {
      this.insertaradministrador(this.administrador);
    }
    this.administrador = {}; // Limpia el formulario después de insertar o modificar
    this.closeModal();
  }

  listaadministradores() {
    this.servicio.getAdministradores().subscribe(administradores => {
      this.administradores = administradores;
    });
    this.servicio.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
      console.log(this.empleados)
    });
  }



  insertaradministrador(administrador: any) {
    this.servicio.createAdministrador(administrador).subscribe(
      response => {
        this.listaadministradores();
        this.toast.show('success', 'administrador insertado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al insertar el administrador');
      }
    );
  }

  cargaradministrador(administrador: any) {
    this.administrador = Object.assign({}, administrador);
    this.openModal();
  }

  modificaradministrador(id: number, administrador: any) {
    this.servicio.updateAdministrador(id, administrador).subscribe(
      response => {
        this.listaadministradores();
        this.toast.show('success', 'administrador modificado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al modificar el administrador');
      }
    );
  }

  eliminaradministrador(administrador: any) {
    this.toast.show('confirmation', '¿Estás seguro?', () => {
      this.servicio.deleteAdministrador(administrador.id).subscribe(
        response => {
          this.toast.show('success', 'administrador eliminado correctamente');
          this.listaadministradores();
        },
        error => {
          this.toast.show('danger', 'Error al eliminar el administrador');
        }
      );
    });
  }
}
