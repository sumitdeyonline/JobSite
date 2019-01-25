import { Component, OnInit } from '@angular/core';

import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';
import {formatDate} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { Country } from 'src/app/services/firebase/userprofile/country.model';
import { State } from 'src/app/services/firebase/userprofile/state.model';





@Component({
  selector: 'postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {





  PostJobForm: any;
  // postjob = new PostJobc();
  postjobMessage: string;
  postjobSucessMessage: string;

  id: any;
  postJobList: [any];
  countries: Country[];
  state: State[];

  constructor(private _activeRoute: ActivatedRoute, private _auth: AuthService, fb: FormBuilder, private postjobService: PostjobService,
              private toastrservice: ToastrService,
              private uProfile: UserprofileService,
              private router: Router,
              private datePipe: DatePipe) {
        
        this.getCountry();
    // this.PostJobForm = fb.group({
    //   // email: ['', Validators.required,Validators.email],
    //   // password: ['', Validators.required,Validators.minLength(5)],
    //   // repassword: ['',Validators.required,Validators.minLength(5)]
    // })

  }

  ngOnInit() {
    // let dateFormat = require('mm/dd/yyyy');
    console.log("Date :::::::: "+formatDate(new Date(), 'MM/dd/yyyy', 'en'));

    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get("PostJobID");
      console.log("Key Value :::::::: "+this.id);
    });

    if ((this.id == null) || (this.id == '')) {
      console.log("NEW FORM ....");
      this.resetForm();
    } else {
      console.log("UPDATE FORM ....");
    }

  }

  JobPostSubmit(postJobForm : NgForm) {

    console.log ("Datatat ::: "+postJobForm.value.JobTitle);
    postJobForm.value.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    console.log ("Datatat ::: "+postJobForm.value.CreatedDate);
    this.postjobService.addUpdatePostJobs(postJobForm.value,this.id);
    //console.log("$Key VALUE :::::: "+postJobForm.value.$key);

    //this.faqservice.updateFaq(faqForm.value);
    /*this.faqservice.insertFaq(faqForm.value);
    this.resetForm(faqForm);
    console.log("Submit Data "+faqForm.value);*/


    if ((this.id == null) || (this.id == '')) {
      this.toastrservice.success('Added Sucessfully', '');
      //this.toastrservice.success(FIREBASE_CONFIG.AddedSucessfully, '');
      //console.log("Added Sucessfully");
    } else {
      this.toastrservice.success('UpdatedSucessfully', '');
      //this.toastrservice.success(FIREBASE_CONFIG.UpdatedSucessfully, '');
      //console.log("Updated Sucessfully");
    }
    this.resetForm(postJobForm);

    this.router.navigate(["jobpoststatus"]);
    //this.router.navigate([FIREBASE_CONFIG.FaqURL]);
  }

  getCountry() {
    this.uProfile.getCountry().subscribe(cprop => {
      this.countries = cprop;
      console.log("Country :::::::: => "+this.countries.length);
    })
  }

  getState(country) {
    this.uProfile.getStateDetails(country).subscribe(sprop => {
      this.state = sprop;
      console.log("Country :::::::: => "+this.state.length);
    })
  }


  resetForm(postJobForm?: NgForm) {
    if (postJobForm !=null)
    postJobForm.reset();
      this.postjobService.selectedPostJobc = {
        //id: '',
        // question: '',
        // answer: '',
        // category: '',
        // details: ''
      }

  }
}
