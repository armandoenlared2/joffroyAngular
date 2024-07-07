import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  @Input() EsAdmin: Boolean = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;

      console.log(this.employees);
     
    });
  }

  @Output() accionHijo = new EventEmitter<number>();
  
  ejecutarAccionEnPadre(accion: number) {
    this.accionHijo.emit(accion);
  }

 
  
  eliminarAccionEnPadre(accion: number) {
    this.employeeService.deleteEmployee(accion).subscribe(data => {
    
      alert('El elemento a sido Eliminado')
     
      this.employeeService.getEmployees().subscribe(data => {
        this.employees = data;
  
        console.log(this.employees);
       
      });
     
    });
  }
}
