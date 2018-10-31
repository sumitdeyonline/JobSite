import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostjobService } from '../../services/firebase/postjob.service';
import { PostJobc } from '../../services/firebase/postjob.model';

@Component({
  selector: 'listjob',
  templateUrl: './listjob.component.html',
  styleUrls: ['./listjob.component.css']
})
export class ListjobComponent implements OnInit {

  keyword: string;
  location: string;
  PostJobc: PostJobc[];

  constructor(private route: ActivatedRoute, private postjob: PostjobService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.keyword = params['keyword'];
      console.log("Keyword " + this.keyword);
      this.location = params['location'];
      console.log("Location " + this.location);
    })

    console.log("FireBase List : .....&&&&&&&&& :::::::-> 1 ");
    this.postjob.getPostJobs(this.keyword,this.location).subscribe(PostJobc => {
      this.PostJobc = PostJobc;
      console.log("List Service ..... 33333 ::::: "+this.PostJobc[1].id);
    });


  }

}
