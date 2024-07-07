// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../authservice.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../global.data';
import { Usuario } from '../usuarios.model';
import { UsuariosService } from '../usuarios.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
FormsModule,
CommonModule
  ]
})
export class LoginComponent {
  public username: string = '';
  password: string = '';
  errorMessage: string = '';

  usuarios: Usuario[] = [];

  rol: number = 0;



  constructor(private authService: AuthService, private router: Router, 
    private dataService: DataService, private usuarioService: UsuariosService) {}

 
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        
        if (response.success) {

          this.usuarioService.getUsuarios().subscribe(data => {
            this.usuarios = data;

            console.log('lista de usuarios');
            console.log(this.usuarios);

            var resultado = this.usuarios.find(elemento => 
             elemento.username.trim() === this.username.trim());


            console.log('usuario buscado');
            console.log(resultado?.roleID);

           this.rol = resultado?.roleID ?? 0;

             // Guarda el token o el estado de login según sea necesario
          this.router.navigate(['/dashboard'],
                                    {
                                        state: {data: this.rol}
                                    }

                                ); // Redirige a la página principal o dashboard


          });                 

        
       
       
       
        } else {
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
      },
      error: (error: HttpErrorResponse) => {
       
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        } else {
          this.errorMessage = 'Ha ocurrido un error. Inténtalo de nuevo.';
        }
       
      }
    });
  }

  /*
  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          // Guarda el token o el estado de login según sea necesario
          this.router.navigate(['/dashboard']); // Redirige a la página principal o dashboard
        } else {
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
      },
      error => {
        this.errorMessage = 'Ha ocurrido un error. Inténtalo de nuevo.';
      }
    );
  }
   */
}
