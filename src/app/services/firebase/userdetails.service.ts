import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { UserDetails } from './userdetails.model';
import { FIREBASE_CONFIG } from '../../global-config';
import { formatDate } from '@angular/common';
import { AuthService } from '../authentication/auth.service';

import * as algoliasearch from 'algoliasearch';
import { SEARCH_CONFIG } from '../../global-config';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  selectedUserDetails: UserDetails;
  udCollection: AngularFirestoreCollection<UserDetails>;
  userDetail: Observable<UserDetails[]>;
  udDoc: AngularFirestoreDocument<UserDetails>;


  client: any;
  index: any;
  //private headers
  // ALGOLIA_APP_ID = "8I5VGLVBT1";
  // ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  //searchQuery: string ="sumitdey@yahoo.com" ;
  user = [];

  constructor(private afs : AngularFirestore, private auth: AuthService, private http: Http) {
    this.udCollection = this.afs.collection(FIREBASE_CONFIG.UserDetails);
     // this.udCollection = this.afs.collection<UserDetails>('userDetail');
    this.userDetail = this.udCollection.valueChanges();
    // this.userDetail =
  }


  addUpdateUserDetails(id: string, uname: string) {

    //this.userDetail = new UserDetails[];
    // let udetails : UserDetails{
    //   username = this.auth.userProfile.name,
    //   udetails.userRole = "Users",

    // };
    console.log("User Name ::::: "+uname);


    if ((id == null) || (id == '')) {
      // const id = this.afs.createId();
      const  cDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      const  uRole = "User";
      const  udeatils: UserDetails = { username: uname, userRole: uRole, CreatedDate: cDate };
      console.log(udeatils);
      this.udCollection.add(udeatils);
      // this.adUserDetails( uname);
      // this.userDetail.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      // uDetails.username = uname;
      // uDetails.userRole = "User";

      // // pjobc.JobTitle =
      // // console.log ("Create Date ::: "+pjobc.CreatedDate);
      // // console.log ("Created By ::: "+pjobc.CreatedBy);
      // // console.log("NEW FORM ....Service");
      // // this.udCollection.add(udetails);
      // this.udCollection.add(uDetails);
    } else {
      console.log("UPDATE FORM ...." + id);
      // //this.faqDoc = this.afs.doc(`faq/${faqc.id}`);
      // this.udDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`);
      // this.udDoc.update(uDetails);
    }

  }

}
