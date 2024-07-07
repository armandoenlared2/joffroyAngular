import { Component, Input , Output, EventEmitter } from '@angular/core';
import { Usuario } from '../usuarios.model';
import {UsuariosService} from '../usuarios.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.css'
})
export class UsuarioEditComponent {

  @Input() usuarioID: number = 0;

  usuario: Usuario | undefined ;
  

  constructor(private usuarioService: UsuariosService) {
   }

  ngOnInit(): void {

    if(this.usuarioID == 0)
    {
      this.usuario = {
        userID: 0,
        username: '',
        passwordHash: '',
        employeeID: 0,
        roleID: 0       
      }
    }
    else
    {
        this.usuarioService.getUsuario(this.usuarioID).subscribe(data => {
          this.usuario = data;

          console.log(this.usuario);
        
        });
    }
  }


  onSubmit() {
    if (this.usuario) {
      this.usuarioService.updateUsuario(this.usuario).subscribe({
        next: (updatedUsuario) => {
          alert('Usuario actualizado');
          this.ejecutarAccionEnPadre(0);

          console.log('Usuario actualizado', updatedUsuario);
          // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
        },
        error: (error) => {
          console.error('Error al actualizar el Usuario', error);
          alert('Error al actualizar el Usuario');
          // Manejo de errores
        },
        complete: () => {
          console.log('Actualización del Usuario completada');
        }
      });
    }
  }


  @Output() accionHijo = new EventEmitter<number>();

  ejecutarAccionEnPadre(accion: number) {
    this.accionHijo.emit(accion);
  }
}
