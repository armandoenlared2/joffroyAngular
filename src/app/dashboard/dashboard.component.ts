import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../global.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  contenidoActual: string = 'empleados';

  usuariosVisible: boolean = false;
  rolesVisible: boolean = false;

  data: number = 0;

  EsAdmin: Boolean = false;

  constructor(private router: Router,private dataService: DataService) { 

   
    const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
   this.data = navigation.extras.state['data'];  


   



  }

  

  

  }


  ngOnInit(): void {
  
    console.log('permisos en el dashboard: ');
    console.log(this.data);

    if(this.data === undefined)
      {

        history.state.data = undefined;
        delete history.state.data;

        this.router.navigate(['/']);       

      }
  
      if(this.data == 1)
      {
          this.usuariosVisible = true;
          this.rolesVisible = true;
          this.EsAdmin = true;
      }

      console.log('visibilidad');
      console.log(this.usuariosVisible);
      console.log(this.rolesVisible);
  
  }



  mostrarContenido(contenido: string) {
    this.contenidoActual = contenido;
  }

  salir() {

    console.log('Saliendo...');
    this.dataService.clearAllData();
    this.router.navigate(['/']);
   
  }

  localID: number = 0;

  

  manejarAccionHijo(accion: number,origen: string) {

    this.localID = accion;

    switch (origen) {
      case 'employee':        
        this.mostrarContenido('employee-edit');
        break;
      case 'rol':
        this.mostrarContenido('rol-edit');
        break;
      case 'usuario':
        this.mostrarContenido('usuario-edit');
        break;
      case 'roles':
        this.mostrarContenido('roles');
        break;
      case 'usuarios':
        this.mostrarContenido('usuarios');
        break;
      case 'empleados':
        this.mostrarContenido('empleados');
        break;
      default:
        // Código a ejecutar si ninguno de los casos anteriores se cumple
        break;
    }


    console.log('Acción recibida del hijo:', accion);
   
  }

}
