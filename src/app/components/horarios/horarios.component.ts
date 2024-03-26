import { Component, OnInit } from '@angular/core';
import { ServiciosapiService } from 'src/app/services/serviciosapi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent {
  //operaciones del modal
  modalOpen = false;
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
  }

  //operaciones de datos
  horarios: any[] = [];
  horario: any = {};
  constructor(private servicio: ServiciosapiService, private toast: ToastService) { }

  ngOnInit(): void {
    this.listahorarios();
  }

  onSubmit() {
    if (this.horario.id) {
      this.modificarhorario(this.horario.id, this.horario);
    } else {
      this.insertarhorario(this.horario);
    }
    this.horario = {}; // Limpia el formulario después de insertar o modificar
    this.closeModal();
  }

  listahorarios() {
    this.servicio.getHorarios().subscribe(horarios => {
      this.horarios = horarios;
    });
  }

  insertarhorario(horario: any) {
    this.servicio.createHorario(horario).subscribe(
      response => {
        this.listahorarios();
        this.toast.show('success', 'horario insertado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al insertar el horario');
      }
    );
  }

  cargarhorario(horario: any) {
    this.horario = Object.assign({}, horario);
    this.openModal();
  }

  modificarhorario(id: number, horario: any) {
    this.servicio.updateHorario(id, horario).subscribe(
      response => {
        this.listahorarios();
        this.toast.show('success', 'horario modificado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al modificar el horario');
      }
    );
  }

  eliminarhorario(horario: any) {
    this.toast.show('confirmation', '¿Estás seguro?', () => {
      this.servicio.deleteHorario(horario.id).subscribe(
        response => {
          this.toast.show('success', 'horario eliminado correctamente');
          this.listahorarios();
        },
        error => {
          this.toast.show('danger', 'Error al eliminar el horario');
        }
      );
    });
  }


}
