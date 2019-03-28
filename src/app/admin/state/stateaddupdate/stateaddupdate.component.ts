import { Component, OnInit, Inject } from '@angular/core';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { State } from 'src/app/services/firebase/userprofile/state.model';
import { FIREBASE_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'app-stateaddupdate',
  templateUrl: './stateaddupdate.component.html',
  styleUrls: ['./stateaddupdate.component.css']
})
export class StateaddupdateComponent implements OnInit {
  state: State;
  stateForm: FormGroup;
  checkState: boolean = false;
  stateSucessMessage: string = FIREBASE_CONFIG.StateCreate;
  constructor(private dialogRef: MatDialogRef<StateaddupdateComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private auth: AuthService, private uPRofile: UserprofileService) { 

      console.log("Country ID(Dialog) :"+data.id); 
      this.checkState = false;
      this.stateForm=  fb.group({
        stateID: [null, Validators.required],
        stateName: [null, Validators.required]
      });        

       if (data.id !='') {
         this.state  = data;
         //console.log("FB ID :"+data.id);
         //console.log("Country ID :"+data.countryID);
        
         console.log("Country Name :::::"+data.CountryName);
      //   this.stateForm.setValue({
      //     countryID: data.countryID,
      //     CountryName: data.CountryName
      //   });
       } else {
        console.log("Country Name :::::-->>>>"+data.CountryName);
       }

    }

  ngOnInit() { 
  }

  addUpdateState() {
    console.log("State ID :"+this.stateForm.get('stateID').value);
    console.log("State Name :"+this.stateForm.get('stateName').value);    
  }

  close() {
    this.dialogRef.close();
  }

}
