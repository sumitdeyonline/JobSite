import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '../Login';

@Component({
  selector: 'resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  form;
  error='';
  login = new Login();
  loginError = '';

  constructor(fb: FormBuilder,
    private _auth: AuthService) {

      this.form = fb.group({
        username: ['', Validators.required]
      })

    }

  ngOnInit() {
  }

  ResetPassword(resetComponent) {
    console.log("Reset Componenet ******* for "+resetComponent.username);
    this.loginError ='';
    this._auth.resetPassword(resetComponent.username);
    //console.log("authResult :::::::: -> !!!!!!!! "+authResult);
    //this._auth.resetPassword(resetComponent.username);
  }

}
