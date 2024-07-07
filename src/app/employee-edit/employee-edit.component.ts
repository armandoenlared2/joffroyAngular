import { Component, Input , Output, EventEmitter } from '@angular/core';
import { Employee } from '../employee.model';
import {EmployeeService} from '../employee.service';
import { DataService } from '../global.data';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {

  @Input() employeeID: number = 0;

  employee: Employee | undefined ;
  

usuarioAdmin: boolean = false;


  constructor(private employeeService: EmployeeService,private dataService: DataService) {


    var result = dataService.getData('rol');

    if(result === 1)
    {
        this.usuarioAdmin = true;
    }


   }

  ngOnInit(): void {

    if(this.employeeID == 0)
    {
      this.employee = {
        employeeID: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        hireDate: new Date(),
        jobTitle: '',
        department: '',
      }
    }
    else
    {
        this.employeeService.getEmployee(this.employeeID).subscribe(data => {
          this.employee = data;

          console.log(this.employee);
        
        });
    }
  }


  onSubmit() {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: (updatedEmployee) => {
          alert('Employee actualizado');
          this.ejecutarAccionEnPadre(0);

          console.log('Employee actualizado', updatedEmployee);
          // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
        },
        error: (error) => {
          console.error('Error al actualizar el Employee', error);
          // Manejo de errores
        },
        complete: () => {
          console.log('Actualización del Employee completada');
        }
      });
    }
  }


  @Output() accionHijo = new EventEmitter<number>();

  ejecutarAccionEnPadre(accion: number) {
    this.accionHijo.emit(accion);
  }
}
