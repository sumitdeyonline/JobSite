import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
//import { PostJobc } from '../../services/firebase/postjob.model';
//import { PostjobService } from '../../services/firebase/postjob.service';

@Component({
  selector: 'jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit {

  id: any;
  public pjob: PostJobc;
  keyword: string;
  location: string;


  constructor(private _activeRoute:ActivatedRoute, private postservice: PostjobService) { 

    this._activeRoute.queryParams.subscribe(params => {
      console.log(params);
      this.keyword = params['keyword'];
      console.log("Keyword " + this.keyword);
      this.location = params['location'];
      console.log("Location " + this.location);
      //this.getPostJobsAlgolia(this.keyword,this.location);
      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    })

  }

  ngOnInit() {

    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("Key Value :::::::: "+this.id);
    }); 
    this.postservice.getPostJobsById(this.id).subscribe(pjob=> {
      this.pjob = pjob;
      console.log("List Service ..... 33333 ::::: "+this.pjob.JobTitle);
    })    

  }

}
