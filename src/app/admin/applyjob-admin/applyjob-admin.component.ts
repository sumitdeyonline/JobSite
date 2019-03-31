import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { PagerService } from 'src/app/services/common/pager.service';

@Component({
  selector: 'applyjobadmin',
  templateUrl: './applyjob-admin.component.html',
  styleUrls: ['./applyjob-admin.component.css']
})
export class ApplyjobAdminComponent implements OnInit {

  aJob: ApplyJob[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
  constructor(private auth: AuthService, private ajob: ApplyjobService,  private pagerService: PagerService) { 

    this.ajob.getApplyJob().subscribe(applyJob => {
      this.aJob = applyJob;
      console.log("User Job :::::::: => "+this.aJob.length);
      this.setPage(1);
    });    

  }

  ngOnInit() {
  }

  setPage(page: number) {
    console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.aJob.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.aJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  } 

}
