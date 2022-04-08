import { Component, OnInit } from '@angular/core';
import { catchError, map, reduce } from 'rxjs/operators';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this)),
      ).subscribe(() => { this.mapDirectReports() });

  }
  private mapDirectReports(): void {
    var directReportsDetails = [];
    var directReportsCount = [];
    this.employees.map((emps, index) => {
      if (emps.directReports && emps.directReports.length) {
        for (var itr = 0; itr < emps.directReports.length; itr++) {
          directReportsDetails.push(this.employees[this.employees[index].directReports[itr] - 1]);
          this.findNumberofReports(this.employees[index].directReports[itr], directReportsCount);
        }
        this.employees[index]['directReportsDetails'] = directReportsDetails;
        directReportsDetails = [];
        this.employees[index]['directReportCount'] = directReportsCount.length;
        directReportsCount = [];
      }
      else {
        this.employees[index]['directReportCount'] = 0;
      }

    })

  }
  private findNumberofReports(employee, employee2): void {
    employee2.push(employee);
    var newEmps = this.employees[employee - 1];
    if (newEmps.directReports && newEmps.directReports.length) {
      for (var itr = 0; itr < newEmps.directReports.length; itr++) {
        this.findNumberofReports(newEmps.directReports[itr], employee2);
      }
    }
  }

  private deleteEmpFunction(data, index): void {
    data['directReports'].splice(index, 1);
    const empData = {
      id: data['id'],
      firstName: data['firstName'],
      lastName: data['lastName'],
      position: data['position'],
      directReports: data['directReports'],
      compensation: data['compensation'] == null ? 0 : data['compensation']
    };
    this.employeeService.save(empData).subscribe(() => this.ngOnInit());
  }
  private editEmpFunction(data, compensation, index): void {
    const selectEmp = data.directReportsDetails[index];

    const empData = {
      id: selectEmp['id'],
      "firstName": selectEmp['firstName'],
      "lastName": selectEmp['lastName'],
      "position": selectEmp['position'],
      "directReports": selectEmp['directReports'],
      "compensation": compensation == null ? 0 : parseInt(compensation)
    };
    this.employeeService.save(empData).subscribe(() => this.ngOnInit());
  }

  private dialogClickHandler(data): void {
    if (data.type == 'delete')
      this.deleteEmpFunction(data.emp, data.index);
    else if (data.type == 'edit')
      this.editEmpFunction(data.emp, data.compensation, data.index);
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
