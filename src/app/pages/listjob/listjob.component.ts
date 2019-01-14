import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { PostjobService } from '../../services/firebase/postjob.service';
//import { PostJobc } from '../../services/firebase/postjob.model';
import { DateformatService } from '../../services/dateformat/dateformat.service';
import * as algoliasearch from 'algoliasearch';
import {isNumeric} from 'rxjs/util/isNumeric';
import { SEARCH_CONFIG } from '../../global-config';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';


@Component({
  selector: 'listjob',
  templateUrl: './listjob.component.html',
  styleUrls: ['./listjob.component.css']
})
export class ListjobComponent implements OnInit {

  keyword: string;
  location: string;
  PostJobc: PostJobc[];
  // PostJobcFinal: PostJobc[] = [];
  // listjob = new ListJob();

  client: any;
  index: any;
  // ALGOLIA_APP_ID = "8I5VGLVBT1";
  // ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  //searchQuery: string ="sumitdey@yahoo.com" ;
  //jobs = [];



  constructor(private route: ActivatedRoute, private postjob: PostjobService, private dformat: DateformatService) {


    //this.PostJobc = null;



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

    //this.PostJobc = this.postjob.getPostJobsAlgolia(this.keyword,this.location);

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

    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.keyword = params['keyword'];
      console.log("Keyword " + this.keyword);
      this.location = params['location'];
      console.log("Location " + this.location);
      this.getPostJobsAlgolia(this.keyword,this.location);
      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    })
  }

  getPostJobsAlgolia(keyword, location) {


    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });

      let filter = '', state='', city='';
      this.PostJobc = [];
      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);

      console.log(" keyword :::: "+keyword+"location :::: "+location);
      if ((keyword.trim() != "") || (location.trim() != "")) {
        if (location.trim() != "") {

          if (isNumeric(location)) {
            console.log("This is number");
            filter = 'JobZip:'+location;
  
          } else {
             
            if (location.indexOf(",") > -1) {
              state = this.isNull(location.split(",")[1].trim());
              city = this.isNull(location.split(",")[0].trim());
            } else {
              city = this.isNull(location.trim());
            }

  
            if ((state !="") && (city !="")) {
              filter = 'JobCity:'+city+' AND JobState:'+state;
            } else if ((state == "") && (city !="")) {
              filter = 'JobCity:'+city;
            } else if ((state != "") && (city =="")){
              filter = 'JobState:'+state;
            } else {
              filter ='';
            }
  
          }
        } else {
          filter ='';
        }
      



      console.log("Filter :::::: => "+filter);

      if (filter == '') {
        this.index.search({
          query: keyword
  
        }).then((data) => {
          //let j=0;
          //this.PostJobcFinal = [];
          this.PostJobc = data.hits;
  
        });
      } else  {

        this.index.search({
          query: keyword,
          filters: filter
        }).then((data) => {
          //let j=0;
          //this.PostJobcFinal = [];
          this.PostJobc = data.hits;
  
        });        

      }
    }



  //   for(let i=0;i<this.PostJobc.length;i++) {
  //     //console.log("Algolia Job ::::::::: =>  "+this.PostJobc[i].JobState);
  //     //console.log("Algolia Job ::::::::: =>  "+this.PostJobc[i].JobTitle);

  //     if (location.trim() != "") {

  //       if (isNumeric(location)) {
  //         console.log("This is number");
  //         if (this.PostJobc[i].JobZip == location) {
  //           this.PostJobcFinal[j] = this.PostJobc[i];
  //           j++;
  //         }

  //       } else {

  //         // console.log("This is not a number");
  //         // console.log("City ::::: "+location.split(",")[0]);
  //         // console.log("State ::::: "+location.split(",")[1]);

  //         // console.log("City ::::: ...2"+this.PostJobc[i].JobCity);
  //         // console.log("State :::::...2 "+this.PostJobc[i].JobState);


  //         //console.log("Test 1 ....5" + location.split(",")[0].trim().toUpperCase()); 
  //         //console.log("Test 1 ....6" + location.split(",")[1].trim().toUpperCase());             
  //         if ((location.split(",")[0].trim().toUpperCase() == this.PostJobc[i].JobCity.toUpperCase()) && (this.isNull(location.split(",")[1]).trim().toUpperCase() == this.PostJobc[i].JobState.toUpperCase())) {
  //           this.PostJobcFinal[j] = this.PostJobc[i];
  //           j++;                
  //         } else if (location.split(",")[0].trim().toUpperCase() == this.PostJobc[i].JobState.toUpperCase()) {
  //           this.PostJobcFinal[j] = this.PostJobc[i];
  //           j++; 
  //         } 
  //         else if (location.split(",")[0].trim().toUpperCase() == this.PostJobc[i].JobCity.toUpperCase()) {
  //           this.PostJobcFinal[j] = this.PostJobc[i];
  //           j++; 
  //         }
  //       }
  //     } else {
  //       this.PostJobcFinal[j] = this.PostJobc[i];
  //       j++;
  //     }

  //   }
  //   //return this.jobs;
  // })




  }

  isNull(value) {
    if (value == null) { return "" }
    else { return value } 
  }


}