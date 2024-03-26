import { Component, OnInit } from '@angular/core';
import { ServiciosapiService } from 'src/app/services/serviciosapi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {
  //operaciones del modal
  modalOpen = false;
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
    this.limpiarCampos();
  }

  //operaciones de datos
  personals: any[] = [];
  empleados: any[] = [];
  horarios: any[] = [];
  servicios: any[] = [];
  personal: any = {};
  serviciosSeleccionados: any[] = [];
  selectedService: any = null;
  constructor(private servicio: ServiciosapiService, private toast: ToastService) { }

  ngOnInit(): void {
    this.listapersonal();


  }

  limpiarCampos() {
    this.personal = {};
    this.serviciosSeleccionados = [];
    this.selectedService = null;
  }

  onSubmit() {
    if (this.personal.id) {
      this.modificarpersonal(this.personal.id, this.personal);
    } else {
      this.insertarpersonal(this.personal);
    }
    this.personal = {}; // Limpia el formulario después de insertar o modificar
    this.closeModal();
  }

  listapersonal() {
    this.servicio.getPersonal().subscribe(personal => {
      this.personals = personal;
    });
    this.servicio.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
    this.servicio.getHorarios().subscribe(horarios => {
      this.horarios = horarios;
    });
    this.servicio.getServicios().subscribe(servicios => {
      this.servicios = servicios;
    });
  }



  insertarpersonal(personal: any) {
    this.servicio.createPersona(personal).subscribe(
      response => {
        const id_personal = response.id; // Asume que la respuesta incluye el id del personal insertado
        this.serviciosSeleccionados.forEach(servicio => {
          const ps_s = {
            id_personal: id_personal,
            id_servicio: servicio.id
          };
          this.servicio.createPs_s(ps_s).subscribe();
        });
        this.listapersonal();
        this.toast.show('success', 'personal insertado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al insertar el personal');
      }
    );
  }

  agregarServicio() {
    if (this.selectedService != null) {
      const isServiceAlreadySelected = this.serviciosSeleccionados.some(servicio => servicio.id === this.selectedService.id);
      if (!isServiceAlreadySelected) {
        if (this.personal.id) {
          // Si existe personal.id, inserta el servicio directamente a través de la API
          const ps_s = {
            id_personal: this.personal.id,
            id_servicio: this.selectedService.id
          };
          this.servicio.createPs_s(ps_s).subscribe(() => {
            // Actualiza la lista de servicios seleccionados después de la inserción
            this.servicio.getServiciosByIdPersonal(this.personal.id).subscribe((servicios: any[]) => {
              this.serviciosSeleccionados = servicios;
            });
          });
        } else {
          // Si no existe personal.id, agrega el servicio a serviciosSeleccionados
          this.serviciosSeleccionados.push(this.selectedService);
        }
      }
    }
  }
  eliminarServicio(servicio: any) {
    const index = this.serviciosSeleccionados.indexOf(servicio);
    if (index > -1) {
      if (this.personal.id) {
        // Si existe personal.id, elimina el servicio directamente a través de la API
        this.servicio.deletePs_s(this.personal.id, servicio.id).subscribe(() => {
          // Actualiza la lista de servicios seleccionados después de la eliminación
          this.servicio.getServiciosByIdPersonal(this.personal.id).subscribe((servicios: any[]) => {
            this.serviciosSeleccionados = servicios;
          });
        });
      } else {
        // Si no existe personal.id, elimina el servicio de serviciosSeleccionados
        this.serviciosSeleccionados.splice(index, 1);
      }
    }
  }

  cargarpersonal(personal: any) {
    this.personal = Object.assign({}, personal);
    this.cargarServiciosSeleccionados(personal.id);
    this.openModal();
  }

  cargarServiciosSeleccionados(id_personal: number) {
    this.serviciosSeleccionados = [];
    this.servicio.getServiciosByIdPersonal(id_personal).subscribe(servicios => {
      this.serviciosSeleccionados = servicios;
      this.selectedService = null; // Restablece this.selectedService a su valor por defecto
    });
  }

  modificarpersonal(id: number, personal: any) {
    this.servicio.updatePersona(id, personal).subscribe(
      response => {
        this.listapersonal();
        this.toast.show('success', 'personal modificado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al modificar el personal');
      }
    );
  }

  eliminarpersonal(personal: any) {
    this.toast.show('confirmation', '¿Estás seguro?', () => {
      this.servicio.deletePersona(personal.id).subscribe(
        response => {
          this.toast.show('success', 'personal eliminado correctamente');
          this.listapersonal();
        },
        error => {
          this.toast.show('danger', 'Error al eliminar el personal');
        }
      );
    });
  }
}
