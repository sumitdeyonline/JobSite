import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';

import { Router } from '@angular/router';
import { DateformatService } from '../../../services/dateformat/dateformat.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';

@Component({
  selector: 'jobpoststatus',
  templateUrl: './jobpoststatus.component.html',
  styleUrls: ['./jobpoststatus.component.css']
})
export class JobpoststatusComponent implements OnInit {


  monthsFull = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
    ];

  pjob: PostJobc[];
  constructor(private auth: AuthService, private postservice: PostjobService, private router: Router, private dformat: DateformatService) { }

  ngOnInit() {

    this.postservice.getPostJobsByUser(this.auth.userProfile.name).subscribe(pjob=> {
      this.pjob = pjob;
      //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    })
  }

  /*monthNumToSigName(monthnum) {
    // console.log("Months :::: "+monthnum);
    // console.log("Months ::::....1 "+ this.months[monthnum - 1]);
    return this.months[monthnum - 1] || '';
  }*/

  goToDetails(id) {
    this.router.navigate(['jobdetails',id]);
  }

}
