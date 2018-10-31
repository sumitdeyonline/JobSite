import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { PostjobService } from '../../../services/firebase/postjob.service';
import { PostJobc } from '../../../services/firebase/postjob.model';
import { Router } from '@angular/router';

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
  constructor(private auth: AuthService, private postservice: PostjobService, private router: Router) { }

  ngOnInit() {

    this.postservice.getPostJobsByUser(this.auth.userProfile.name).subscribe(pjob=> {
      this.pjob = pjob;
      //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    })
  }

  monthNumToSigName(monthnum) {
    // console.log("Months :::: "+monthnum);
    // console.log("Months ::::....1 "+ this.months[monthnum - 1]);
    return this.months[monthnum - 1] || '';
  }

  goToDetails(id) {
    this.router.navigate(['jobdetails',id]);
  }

}
