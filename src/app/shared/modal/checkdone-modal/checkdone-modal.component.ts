import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Validate } from 'src/app/services/validate.service';


@Component({
  selector: 'checkdone-modal',
  templateUrl: './checkdone-modal.component.html',
  styleUrls: ['./checkdone-modal.component.scss']
})
export class CheckDoneModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CheckDoneModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    public validate: Validate,

  ) {

  }

  ngOnInit() {

  }

  clear() {
    this.dialogRef.close({ type: 'clear' });
  }

  keep() {
    this.dialogRef.close({ type: 'keep' });
  }
}