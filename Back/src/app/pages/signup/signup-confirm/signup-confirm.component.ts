import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.css']
})
export class SignupConfirmComponent implements OnInit {

  @Input() signupSucessMessage: string;
  constructor(private router: Router) { 
    console.log("SIGNUP CONFIRM ::::: "+this.signupSucessMessage);
  }

  ngOnInit() {
  }

}
