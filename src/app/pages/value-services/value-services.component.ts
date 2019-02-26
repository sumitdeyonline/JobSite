import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, NgForm, EmailValidator, FormGroup, FormControl  } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ValueServices } from 'src/app/services/authentication/valueservices';
import { AUTH_CONFIG, FIREBASE_CONFIG } from 'src/app/global-config';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserDetails } from 'src/app/services/firebase/userdetails/UserDetails.model';

@Component({
  selector: 'valueservices',
  templateUrl: './value-services.component.html',
  styleUrls: ['./value-services.component.css']
})
export class ValueServicesComponent implements OnInit {

  userDetails: UserDetails[];
  valueservicesForm: any;
  valueservices = new ValueServices();
  valueservicesMessage: string='';
  valueservicesSucessMessage: string='';  
  error: any[];
  email: any = '';
  postjob: boolean = false;
  resumesearch: boolean = false;
  
  constructor(private _auth: AuthService, fb: FormBuilder, private udetails: UserdetailsService) { 

    this.valueservicesForm = fb.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required,Validators.minLength(5)],
      repassword: ['',Validators.required,Validators.minLength(5)],
      postjob: [false],
      resumesearch: [false]
    });
    if (this._auth.isAuthenticated()) { 

      this.udetails.getUserDetails(this._auth.userProfile.name).subscribe(udtl=> {
        this.userDetails = udtl;
        console.log("Role "+this.userDetails[0].userRole);
        this.email = this._auth.userProfile.name;

        if (this.userDetails[0].userRole == FIREBASE_CONFIG.EmployerPowerUser) {
          this.postjob = true;
          this.resumesearch = true;

          console.log("Post Job :::::111 -> "+this.postjob);
          console.log("Resume Search :::::111 -> "+this.resumesearch);          

        } else if (this.userDetails[0].userRole == FIREBASE_CONFIG.EmployerPostJob) {
          this.postjob = true;
        } else if (this.userDetails[0].userRole == FIREBASE_CONFIG.EmployerResumeSearch) {
          this.resumesearch = true;
        }
        // this.valueservicesForm = fb.group({
        //   email: [this.email, Validators.required,Validators.email],
        //   password: ['', Validators.required,Validators.minLength(5)],
        //   repassword: ['',Validators.required,Validators.minLength(5)],
        //   postjob: [this.postjob],
        //   resumesearch: [this.resumesearch]
        // })  

      })

    } else {

       

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

    console.log("Post Job ::::: "+model.postjob);
    console.log("Resume Search ::::: "+model.resumesearch);
    console.log("Email ::::: "+model.email);
    console.log("Password ::::: "+model.password);  
    console.log("RE-Password ::::: "+model.repassword);       

    if (this._auth.isAuthenticated()) {
      model.email = this._auth.userProfile.name;
      console.log("Post Job ::::: "+model.postjob);
      console.log("Resume Search ::::: "+model.resumesearch);
      this.udetails.addUpdateUserDetails(null, model.email, valueServiceRole);
      return true;
    } else {
      this._auth.signUp(model).subscribe(
        model => {
            // refresh the list
            //alert("User Addred");
            this.valueservicesSucessMessage = model.email+" has been Sucessfully Registered"
            console.log(this.valueservicesSucessMessage);
            this.udetails.addUpdateUserDetails(null, model.email, valueServiceRole);
            //this.router.navigate(['/signupconfirm']);
            return true;
        },
        error => {
          this.error = error;
          console.log("Message 2 "+error);
          //console.log("Message 1 "+error[1].name);
          //console.log("Message 2 "+error.description);
          //this.signupMessage = error; //   "This user already exists."
          this.valueservicesSucessMessage = "User already exists or password not satisfy minimum requrements"; //   "This user already exists."
        });
    }





      // {
      //     //alert("Error : "+error.description);
      //     console.error("Error Adding User" + error.description);
      //     this.signupMessage = "User Exists";
      //     //this.signupMessage = error.description;
      //     //return Observable.throw(error);
      // });
    }


    resetForm(valueservicesForm? : NgForm) {
      //this.signupError='';
      if (valueservicesForm !=null)
      valueservicesForm.reset();
      this.valueservicesMessage ='';
      this.valueservicesSucessMessage ='';
      //console.log("User Name "+SignupComponent.username+" Password "+SignupComponent.password+" Re Pass : "+SignupComponent.repassword);
      // SignupComponent.username='';
      // SignupComponent.password='';
      // SignupComponent.repassword='';
      // this.signup = new SignUp();
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
