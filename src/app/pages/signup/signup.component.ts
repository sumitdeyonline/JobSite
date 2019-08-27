import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm, EmailValidator, FormGroup, FormControl  } from '@angular/forms';
import { Signup } from '../../services/authentication/signup';
import { AuthService } from '../../services/authentication/auth.service';
import { AUTH_CONFIG, FIREBASE_CONFIG } from '../../global-config';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: any;
  signup = new Signup();
  signupMessage: string='';
  signupSucessMessage: string='';

  error: any[]; // {"name":"BadRequestError","code":"user_exists","description":"The user already exists.","statusCode":400}

  constructor(private _auth: AuthService, fb: FormBuilder, private udetails: UserdetailsService) {

    this.signupForm = fb.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required,Validators.minLength(5)],
      repassword: ['',Validators.required,Validators.minLength(5)]
    })

  }

  ngOnInit() {
  }

  signUp(modelUsr: Signup) {
    this.signupMessage = '';
    modelUsr.client_id = AUTH_CONFIG.clientID;
    modelUsr.connection = AUTH_CONFIG.connection;
    modelUsr.response_type = AUTH_CONFIG.responseType;
    //model.username = "Sumit Dey";
    this._auth.signUp(modelUsr).subscribe(
      model => {
          // refresh the list
          //alert("User Addred");
          this.signupSucessMessage = modelUsr.email+" has been Sucessfully Registered"
          console.log(this.signupSucessMessage);
          //this.udetails.addUpdateUserDetails(null, modelUsr.email,FIREBASE_CONFIG.UserRole, modelUsr.company, modelUsr.companyAddress,modelUsr.phone,0);
          this.udetails.addUpdateUserDetails(null, modelUsr.email,FIREBASE_CONFIG.UserRole, modelUsr.company, modelUsr.companyAddress,modelUsr.phone,0);
          //this.router.navigate(['/signupconfirm']);
          return true;
      },
      error => {
        this.error = error;
        console.log("Message 2 "+error);
        //console.log("Message 1 "+error[1].name);
        //console.log("Message 2 "+error.description);
        //this.signupMessage = error; //   "This user already exists."
        this.signupMessage = "User already exists or password not satisfy minimum requrements"; //   "This user already exists."
      });



      // {
      //     //alert("Error : "+error.description);
      //     console.error("Error Adding User" + error.description);
      //     this.signupMessage = "User Exists";
      //     //this.signupMessage = error.description;
      //     //return Observable.throw(error);
      // });
    }
    resetForm(signupForm? : NgForm) {
      //this.signupError='';
      if (signupForm !=null)
      signupForm.reset();
      this.signupMessage ='';
      this.signupSucessMessage ='';
      //console.log("User Name "+SignupComponent.username+" Password "+SignupComponent.password+" Re Pass : "+SignupComponent.repassword);
      // SignupComponent.username='';
      // SignupComponent.password='';
      // SignupComponent.repassword='';
      // this.signup = new SignUp();
    }

    onFocus(event) {
      this.signupMessage = '';
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

}
