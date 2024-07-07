import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    DashboardComponent,
    RolesListComponent,
    UsuariosListComponent,
    EmployeeEditComponent,
    UsuarioEditComponent,
    RolEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    LoginComponent,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
