import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms';

@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.css']
})
export class ApplyjobComponent implements OnInit {

  applyJobForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ApplyjobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder)
    {

      this.applyJobForm =  fb.group({
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'PhoneNumber': '',
      });

    }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

  applyNow(form:NgForm){
    console.log(form);
    this.close();
  }

}
