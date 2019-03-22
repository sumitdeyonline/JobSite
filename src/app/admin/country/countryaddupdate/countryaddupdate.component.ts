import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-countryaddupdate',
  templateUrl: './countryaddupdate.component.html',
  styleUrls: ['./countryaddupdate.component.css']
})
export class CountryaddupdateComponent implements OnInit {

  countryForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<CountryaddupdateComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private auth: AuthService) { 

    this.countryForm=  fb.group({
      countryID: [null, Validators.required],
      CountryName: [null, Validators.required]
    });    

  }
  
  ngOnInit() {
  }  

  close() {
    this.dialogRef.close();
  }

}
