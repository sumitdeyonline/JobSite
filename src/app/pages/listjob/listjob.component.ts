import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostjobService } from '../../services/firebase/postjob.service';
import { PostJobc } from '../../services/firebase/postjob.model';
import { DateformatService } from '../../services/dateformat/dateformat.service';
import * as algoliasearch from 'algoliasearch';

@Component({
  selector: 'listjob',
  templateUrl: './listjob.component.html',
  styleUrls: ['./listjob.component.css']
})
export class ListjobComponent implements OnInit {

  keyword: string;
  location: string;
  PostJobc: PostJobc[];


  client: any;
  index: any;
  ALGOLIA_APP_ID = "8I5VGLVBT1";
  ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  searchQuery: string ="sumitdey@yahoo.com" ;
  jobs = [];



  constructor(private route: ActivatedRoute, private postjob: PostjobService, private dformat: DateformatService) {
    //this.PostJobc = null;

    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.keyword = params['keyword'];
      console.log("Keyword " + this.keyword);
      this.location = params['location'];
      console.log("Location " + this.location);
    })

    //console.log("FireBase List : .....&&&&&&&&& :::::::-> 1 ");
    // this.postjob.getPostJobs(this.keyword,this.location).subscribe(PostJobc => {
    //   this.PostJobc = PostJobc;
    //   //console.log("List Service ..... 33333 ::::: "+this.PostJobc[1].JobTitle);
    //   //console.log("List Service ..... 4444 ::::: "+this.PostJobc[1].JobCity);
    // });

    // console.log("FireBase List : .....&&&&&&&&& :::::::-> 1 ");
    // this.postjob.getPostJobsAlgolia(this.keyword,this.location).subscribe(PostJobc => {
    //   this.PostJobc = PostJobc;
    //   console.log("List Service ..... 33333 ::::: "+this.PostJobc[1].JobTitle);
    //   console.log("List Service ..... 4444 ::::: "+this.PostJobc[1].JobCity);
    // });

     this.PostJobc = this.postjob.getPostJobsAlgolia(this.keyword,this.location);
    //    console.log("List Service ..... 33333 ::::: "+this.PostJobc[1].JobTitle);
    //    console.log("List Service ..... 4444 ::::: "+this.PostJobc[1].JobCity);
    // this.client = algoliasearch(this.ALGOLIA_APP_ID, this.ALGOLIA_API_KEY,
    //   { protocol: 'https:' });
    //   console.log("Test 1 ....1" );



    //   this.index = this.client.initIndex("PostJob");
    //   console.log("Test 1 ....2" );
    //   //this.index.searchQuery

    //   // this.index.search({
    //   //   facetFilters: ["JobState=CA"]
    //   // });
    //   // this.index.searchForFacetValues({
    //   //   facetName: 'JobState',
    //   //   facetQuery: 'CA',
    //   this.index.search({
    //     //filters: "{JobState:CA}",
    //     //filters:  'CA'
    //     // searchfiltersarameters: {
    //     //   filters: '{JobState:CA}'
    //     // }
    //     //facetFilters: "{JobState:CA}",
    //     //searchParameters: '[JobState=CA]'
    //     query: this.keyword,
    //     //query: '{ JobState:CA }',
    //     //attributesToRetrieve: ['JobTitle', 'JobDesc']

    //     // restrictSearchableAttributes: [
    //     //   'JobTitle',
    //     //   'JobDesc'
    //     // ]
    //     //filters: 'JobState=CA'

    //   }).then((data) => {

    //     this.PostJobc = data.hits;
    //     for(let i=0;i<this.PostJobc.length;i++) {
    //       console.log("Algolia Job ::::::::: =>  "+this.PostJobc[i].JobState);
    //       console.log("Algolia Job ::::::::: =>  "+this.PostJobc[i].JobTitle);
    //     }

    //   })



  }

  ngOnInit() {



  }

}
