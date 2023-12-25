import { Component, OnInit } from '@angular/core';
import { ServiciosapiService } from 'src/app/services/serviciosapi.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  modalOpen = false;
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
  }

  empleados: any[] = [];
  empleado: any = {};
  constructor(private servicio: ServiciosapiService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.listaEmpleados();
  }

  onSubmit() {
    if (this.empleado.id) {
      this.modificarEmpleado(this.empleado.id, this.empleado);
    } else {
      this.insertarEmpleado(this.empleado);
    }
    this.empleado = {}; // Limpia el formulario después de insertar o modificar
    this.closeModal();
  }

  listaEmpleados() {
    this.servicio.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  insertarEmpleado(empleado: any) {
    this.servicio.createEmpleado(empleado).subscribe(
      response => {
        this.toastService.show('success', 'Empleado insertado correctamente');
        this.listaEmpleados();
      },
      error => {
        this.toastService.show('danger', 'Error al insertar el empleado');
      }
    );
  }

  cargarEmpleado(empleado: any) {
    this.empleado = Object.assign({}, empleado);
    this.openModal();
  }

  modificarEmpleado(id: number, empleado: any) {
    this.servicio.updateEmpleado(id, empleado).subscribe(
      response => {
        this.listaEmpleados();
      },
      error => {
        console.error(error);
        this.toastService.show('danger', 'Error al modificar el empleado');
      }
    );
  }

  eliminarEmpleado(empleado: any) {
    this.toastService.show('confirmation', '¿Estás seguro?', () => {
      this.servicio.deleteEmpleado(empleado.id).subscribe(
        response => {
          this.toastService.show('success', 'Empleado eliminado correctamente');
          this.listaEmpleados();
        },
        error => {
          this.toastService.show('danger', 'Error al eliminar el empleado');
        }
      );
    });
  }

}
