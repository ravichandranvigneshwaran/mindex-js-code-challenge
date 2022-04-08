import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  firstName: string;
  lastName: string;
  type:string;
  position:string;
  myFun:any;
  compensation:number;
}

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.css']
})
export class ActionDialogComponent implements OnInit {
  
  compensation:number;
  firstName:String;
  lastName:String;
  position:String;

  //NOTE: Pass data from TS to HTML
  constructor(public dialogRef: MatDialogRef<ActionDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,) { 
    this.compensation = data.compensation;
  }

  ngOnInit(): void {
  }

  //NOTE: Handle click from dialog and emit it to the parent component
  onEditClick(data){
    data.myFun({type:'edit',compensation:this.compensation,index:data.index});
  }

  //NOTE: Close the dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
}
