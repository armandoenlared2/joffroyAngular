import { Component, Input , Output, EventEmitter} from '@angular/core';
import { Rol } from '../roles.model';
import {RolesService} from '../roles.service';

@Component({
  selector: 'app-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrl: './rol-edit.component.css'
})
export class RolEditComponent {

  @Input() rolID: number = 0;

  rol: Rol | undefined ;
  

  constructor(private rolesService: RolesService) {
   }

  ngOnInit(): void {

    if(this.rolID == 0)
    {
      this.rol = {
        roleID: 0,
        roleName: '',
        roleDescription: ''   
      }
    }
    else
    {
        this.rolesService.getRol(this.rolID).subscribe(data => {
          this.rol = data;

          console.log(this.rol);
        
        });
    }
  }


  onSubmit() {
    if (this.rol) {
      this.rolesService.updateRol(this.rol).subscribe({
        next: (updatedRol) => {
          alert('Rol actualizado');
          this.ejecutarAccionEnPadre(0);

          console.log('Rol actualizado', updatedRol);
          // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
        },
        error: (error) => {
          console.error('Error al actualizar el rol', error);
          // Manejo de errores
        },
        complete: () => {
          console.log('Actualización del rol completada');
        }
      });
    }
  }


  @Output() accionHijo = new EventEmitter<number>();

  ejecutarAccionEnPadre(accion: number) {
    this.accionHijo.emit(accion);
  }



}
