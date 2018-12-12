import { Component, OnInit } from '@angular/core';
import { DateformatService } from '../../services/dateformat/dateformat.service';

import * as algoliasearch from 'algoliasearch';
import {isNumeric} from 'rxjs/util/isNumeric';
import { SEARCH_CONFIG } from '../../global-config';
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'resumesearch',
  templateUrl: './resumesearch.component.html',
  styleUrls: ['./resumesearch.component.css']
})
export class ResumesearchComponent implements OnInit {


  UserProfile: UserProfile[];
  //UserProfileFinal: UserProfile[] = [];

  client: any;
  index: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }


  getResumeSearchAlgolia(searchResume: NgForm) {

    console.log("Search Parameter ::::: "+searchResume.value.ResumeSearch);
    const filter = 'isSearchable:true';
    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });


      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME_PROFILE);


      this.index.search({
        query: searchResume.value.ResumeSearch,
        filters: filter

        
      }).then((data) => {
        console.log(data);
        //let j=0;
        //this.UserProfileFinal = [];
        this.UserProfile = data.hits;        


      })


    //   this.companyIndex.search({
    //     query: this.whatSearchQuery,
    //     filters: 'category:Hotel'

    // }, function searchDone(err, content) {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     for (var h in content.hits) {
    //         console.log(
    //             `Hit(${content.hits[h].objectID}): ${content.hits[h].toString()}`
    //         );
    //     }
    // });}



  }

  isNull(value) {
    if (value == null) { return "" }
    else { return value } 
  }

}
