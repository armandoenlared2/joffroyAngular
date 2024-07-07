import { Component, Output, EventEmitter } from '@angular/core';
import { Rol } from '../roles.model';
import {RolesService} from '../roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css'
})
export class RolesListComponent {

  roles: Rol[] = [];

  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(data => {
      this.roles = data;

      console.log(this.roles);
     
    });
  }

  @Output() accionHijo = new EventEmitter<number>();

  ejecutarAccionEnPadre(accion: number) {
    this.accionHijo.emit(accion);
  }


  
  eliminarAccionEnPadre(accion: number) {
    this.rolesService.deleteRol(accion).subscribe(data => {
    
      alert('El elemento a sido Eliminado')
     
      this.rolesService.getRoles().subscribe(data => {
        this.roles = data;
  
        console.log(this.roles);
       
      });
     
    });
  }

}
