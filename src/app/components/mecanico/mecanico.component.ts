import { Component, OnInit } from '@angular/core';
import { ServiciosapiService } from 'src/app/services/serviciosapi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-mecanico',
  templateUrl: './mecanico.component.html',
  styleUrls: ['./mecanico.component.css']
})
export class MecanicoComponent {
  //operaciones del modal
  modalOpen = false;
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
  }

  //operaciones de datos
  mecanicos: any[] = [];
  empleados: any[] = [];
  mecanico: any = {};
  constructor(private servicio: ServiciosapiService, private toast: ToastService) { }

  ngOnInit(): void {
    this.listamecanicos();

  }

  onSubmit() {
    if (this.mecanico.id) {
      this.modificarmecanico(this.mecanico.id, this.mecanico);
    } else {
      this.insertarmecanico(this.mecanico);
    }
    this.mecanico = {}; // Limpia el formulario después de insertar o modificar
    this.closeModal();
  }

  listamecanicos() {
    this.servicio.getMecanicos().subscribe(mecanicos => {
      this.mecanicos = mecanicos;
    });
    this.servicio.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
      console.log(this.empleados)
    });
  }



  insertarmecanico(mecanico: any) {
    this.servicio.createMecanico(mecanico).subscribe(
      response => {
        this.listamecanicos();
        this.toast.show('success', 'mecanico insertado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al insertar el mecanico');
      }
    );
  }

  cargarmecanico(mecanico: any) {
    this.mecanico = Object.assign({}, mecanico);
    this.openModal();
  }

  modificarmecanico(id: number, mecanico: any) {
    this.servicio.updateMecanico(id, mecanico).subscribe(
      response => {
        this.listamecanicos();
        this.toast.show('success', 'mecanico modificado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al modificar el mecanico');
      }
    );
  }

  eliminarmecanico(mecanico: any) {
    this.toast.show('confirmation', '¿Estás seguro?', () => {
      this.servicio.deleteMecanico(mecanico.id).subscribe(
        response => {
          this.toast.show('success', 'mecanico eliminado correctamente');
          this.listamecanicos();
        },
        error => {
          this.toast.show('danger', 'Error al eliminar el mecanico');
        }
      );
    });
  }
}
