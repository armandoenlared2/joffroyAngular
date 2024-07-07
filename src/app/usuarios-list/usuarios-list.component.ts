import { Component, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../usuarios.model';
import {UsuariosService} from '../usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;

      console.log(this.usuarios);
     
    });
  }
  
  @Output() accionHijo = new EventEmitter<number>();

  ejecutarAccionEnPadre(accion: number) {
    this.accionHijo.emit(accion);
  }

  eliminarAccionEnPadre(accion: number) {
    this.usuarioService.deleteUsuario(accion).subscribe(data => {
    
      alert('El elemento a sido Eliminado')
     
      this.usuarioService.getUsuarios().subscribe(data => {
        this.usuarios = data;
  
        console.log(this.usuarios);
       
      });
     
    });
  }
}
