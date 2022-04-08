import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Employee } from '../employee';

export interface DialogData {
  firstName: string;
  lastName: string;
  type:string;
  position:string;
  myFun:any;
  compensation:number;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  compensation:number;
  firstName:String;
  lastName:String;
  position:String;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,) { 
    this.compensation = data.compensation;
  }

  ngOnInit(): void {
  }

  onEditClick(data){
    data.myFun({type:'edit',compensation:this.compensation,index:data.index});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
