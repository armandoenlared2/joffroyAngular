import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from './roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiUrl = 'https://webapplicationjoffroy20240707005245.azurewebsites.net/api/Roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  getRol(id: number): Observable<Rol> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Rol>(url);
  }

  updateRol(rol: Rol): Observable<void> {
    const url = `${this.apiUrl}/${rol.roleID}`;
    return this.http.put<void>(url, rol);
  }

  deleteRol(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
