import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../employee';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;

  @Output() onDialogClick: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(public dialog: MatDialog) {
  };

  openDialog(data): void {
    var clickedData = this.employee['directReportsDetails'][data.index];
    const deleteDialogRef = this.dialog.open(ActionDialogComponent, {
      width: '325px',
      data: {
        lastName: clickedData['lastName'], firstName: clickedData['firstName'], position: clickedData['position'], id: clickedData['id'], type: data['type'], index: data['index'], compensation:clickedData['compensation'], emitFun: (data) => {
          deleteDialogRef.close();
          this.onDialogClick.emit({ type: data['type'], emp: this.employee, index: data['index'],compensation:data['compensation'] });
        }
      }
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
