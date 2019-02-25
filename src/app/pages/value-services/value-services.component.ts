import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ValueServices } from 'src/app/services/authentication/valueservices';
import { AUTH_CONFIG, FIREBASE_CONFIG } from 'src/app/global-config';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';

@Component({
  selector: 'valueservices',
  templateUrl: './value-services.component.html',
  styleUrls: ['./value-services.component.css']
})
export class ValueServicesComponent implements OnInit {

  valueservicesForm: any;
  valueservices = new ValueServices();
  valueservicesMessage: string='';
  valueservicesSucessMessage: string='';  
  error: any[];
  
  constructor(private _auth: AuthService, fb: FormBuilder, private udetails: UserdetailsService) { 
    this.valueservicesForm = fb.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required,Validators.minLength(5)],
      repassword: ['',Validators.required,Validators.minLength(5)],
      postjob: [false],
      resumesearch: [false],
    })

    if (this._auth.isAuthenticated()) { 
      this.valueservicesForm.email = this._auth.userProfile.name;
      this.valueservices.email = this._auth.userProfile.name;
      console.log("User Profile ::::: "+this.valueservices.email);
    }
    // this.valueservicesForm.postjob = false;
    // this.valueservicesForm.resumesearch = false;
  }

  
  ngOnInit() {
  }

  signUpValueServices(model: ValueServices) {
    this.valueservicesMessage = '';
    model.client_id = AUTH_CONFIG.clientID;
    model.connection = AUTH_CONFIG.connection;
    model.response_type = AUTH_CONFIG.responseType;
    let valueServiceRole;
    //model.username = "Sumit Dey";
    if ((model.resumesearch) && (model.postjob)) {
      valueServiceRole = FIREBASE_CONFIG.EmployerPowerUser;
    } else if (model.resumesearch) {
      valueServiceRole = FIREBASE_CONFIG.EmployerResumeSearch;
    } else if (model.postjob) {
      valueServiceRole = FIREBASE_CONFIG.EmployerPostJob;
    } else {
      valueServiceRole = FIREBASE_CONFIG.EmployerPostJob;
    }
    if (this._auth.isAuthenticated()) {
      model.email = this._auth.userProfile.name;
      console.log("Post Job ::::: "+model.postjob);
      console.log("Resume Search ::::: "+model.resumesearch);
      // this.udetails.addUpdateUserDetails(null, model.email, valueServiceRole);
      return true;
    } else {
      // this._auth.signUp(model).subscribe(
      //   model => {
      //       // refresh the list
      //       //alert("User Addred");
      //       this.valueservicesSucessMessage = model.email+" has been Sucessfully Registered"
      //       console.log(this.valueservicesSucessMessage);
      //       this.udetails.addUpdateUserDetails(null, model.email, valueServiceRole);
      //       //this.router.navigate(['/signupconfirm']);
      //       return true;
      //   },
      //   error => {
      //     this.error = error;
      //     console.log("Message 2 "+error);
      //     //console.log("Message 1 "+error[1].name);
      //     //console.log("Message 2 "+error.description);
      //     //this.signupMessage = error; //   "This user already exists."
      //     this.valueservicesSucessMessage = "User already exists or password not satisfy minimum requrements"; //   "This user already exists."
      //   });
    }





      // {
      //     //alert("Error : "+error.description);
      //     console.error("Error Adding User" + error.description);
      //     this.signupMessage = "User Exists";
      //     //this.signupMessage = error.description;
      //     //return Observable.throw(error);
      // });
    }

    Fieldlength(fieldValue: string): number {
      //console.log("FIELD LENGTH .."+fieldValue);
      if (fieldValue == null) {
        return 0;
      } else {
        //console.log("FIELD LENGTH .."+fieldValue.length);
        return fieldValue.length;
      }

    }

    onFocus(event) {
      this.valueservicesMessage = '';
    }


}
