import { Component, OnInit } from '@angular/core';
import { ServiciosapiService } from 'src/app/services/serviciosapi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  //operaciones del modal
  modalOpen = false;
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
  }

  //operaciones de datos
  clientes: any[] = [];
  cliente: any = {};
  constructor(private servicio: ServiciosapiService, private toast: ToastService) { }

  ngOnInit(): void {
    this.listaClientes();
  }

  onSubmit() {
    if (this.cliente.id) {
      this.modificarCliente(this.cliente.id, this.cliente);
    } else {
      this.insertarCliente(this.cliente);
    }
    this.cliente = {}; // Limpia el formulario después de insertar o modificar
    this.closeModal();
  }

  listaClientes() {
    this.servicio.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  insertarCliente(cliente: any) {
    this.servicio.createCliente(cliente).subscribe(
      response => {
        this.listaClientes();
        this.toast.show('success', 'Cliente insertado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al insertar el cliente');
      }
    );
  }

  cargarCliente(cliente: any) {
    this.cliente = Object.assign({}, cliente);
    this.openModal();
  }

  modificarCliente(id: number, cliente: any) {
    this.servicio.updateCliente(id, cliente).subscribe(
      response => {
        this.listaClientes();
        this.toast.show('success', 'Cliente modificado correctamente');
      },
      error => {
        this.toast.show('danger', 'Error al modificar el cliente');
      }
    );
  }

  eliminarCliente(cliente: any) {
    this.servicio.deleteCliente(cliente.id).subscribe(
      response => {
        this.toast.show('success', 'Cliente eliminado correctamente');
        this.listaClientes();
      },
      error => {
        this.toast.show('danger', 'Error al eliminar el cliente');
      }
    );
  }
}
