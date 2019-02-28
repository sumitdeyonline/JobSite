import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, NgForm, EmailValidator, FormGroup, FormControl  } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ValueServices } from 'src/app/services/authentication/valueservices.model';
import { AUTH_CONFIG, FIREBASE_CONFIG } from 'src/app/global-config';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserDetails } from 'src/app/services/firebase/userdetails/UserDetails.model';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserRole } from 'src/app/services/firebase/userprofile/userrole.model';

@Component({
  selector: 'valueservices',
  templateUrl: './value-services.component.html',
  styleUrls: ['./value-services.component.css']
})
export class ValueServicesComponent implements OnInit {

  userDetails: UserDetails[];
  ValueServices: ValueServices[];
  valueservicesForm: any;
  //valueservices = new ValueServices();
  valueservicesMessage: string='';
  valueservicesSucessMessage: string='';
  error: any[];
  email: any = '';
  postjob: boolean = false;
  resumesearch: boolean = false;
  UserRole: UserRole[];
  userActualRole: string;

  constructor(private _auth: AuthService, fb: FormBuilder, private udetails: UserdetailsService, private uProfile: UserprofileService) {

    // this.valueservicesForm = fb.group({
    //   email: ['', Validators.required,Validators.email],
    //   password: ['', Validators.required,Validators.minLength(5)],
    //   repassword: ['',Validators.required,Validators.minLength(5)],
    //   postjob: [false],
    //   resumesearch: [false]
    // });

    if (this._auth.isAuthenticated()) {

      this.udetails.getUserDetails(this._auth.userProfile.name).subscribe(udtl=> {
        this.userDetails = udtl;
        console.log(" Length :::: "+this.userDetails.length);
        this.userActualRole = this.userDetails[0].userRole;
        this.resetForm();
        if (this.userDetails.length > 0) {
          console.log("Role "+this.userDetails[0].userRole+" Length :::: "+this.userDetails.length);
          //this.email = this._auth.userProfile.name;


          this.uProfile.getUserRoleDetails().subscribe(urole => {
            this.UserRole = urole;
            console.log("User Role :::::::: => "+this.UserRole.length);
            for(let i=0;i<this.UserRole.length;i++) {
              if (this.userDetails[0].userRole == this.UserRole[i].RoleName)
              {
                
              }
              console.log("RoleName :: "+this.UserRole[i].RoleName);
              console.log("RoleDetails :: "+this.UserRole[i].RoleDetails);
              console.log("Role Type :: "+this.UserRole[i].RoleType);

            }
          })          

          
          if (this.userDetails[0].userRole == FIREBASE_CONFIG.EmployerPowerUser) {
            this.postjob = true;
            this.resumesearch = true;

            console.log("Post Job :::::111 -> "+this.postjob);
            console.log("Resume Search :::::111 -> "+this.resumesearch);

          } else if (this.userDetails[0].userRole == FIREBASE_CONFIG.EmployerPostJob) {
            this.postjob = true;
          } else if (this.userDetails[0].userRole == FIREBASE_CONFIG.EmployerResumeSearch) {
            this.resumesearch = true;
          } else if (this.userDetails[0].userRole == FIREBASE_CONFIG.AdminRole) {
            this.postjob = true;
            this.resumesearch = true;
          }   
           
          this.udetails.selectedValueServices = {}

          this.udetails.selectedValueServices.email = this.userDetails[0].userName;
          this.udetails.selectedValueServices.userRole = this.userDetails[0].userRole;
          this.udetails.selectedValueServices.resumesearch = this.resumesearch;
          this.udetails.selectedValueServices.password = '';
          this.udetails.selectedValueServices.repassword = '';

        } else {

        }


       // this.udetails.selectedValueServices.email = udtl.
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
    console.log("Value Radio Burron :::: "+model.userRole);
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
      //this.udetails.addUpdateUserDetails(null, model.email, valueServiceRole);
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

      this.udetails.selectedValueServices = {
        email: ''
        //id: '',
        // question: '',
        // answer: '',
        // category: '',
        // details: ''
      }

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
