// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://webapplicationjoffroy20240707005245.azurewebsites.net/api/systemusers'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  login(Username: string, Password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { Username, Password });
  }
}
