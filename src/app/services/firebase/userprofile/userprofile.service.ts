import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { UserProfile } from './userprofile.model';
import { Http } from '@angular/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  selectedUserProfile: UserProfile;
  upCollection: AngularFirestoreCollection <UserProfile>;
  UserProfilec: Observable<UserProfile[]>;
  upDoc: AngularFirestoreDocument<UserProfile>;

  userProfile = [];

  constructor(private afs : AngularFirestore, private auth: AuthService, private http: Http) {
    this.upCollection = this.afs.collection(FIREBASE_CONFIG.UserProfile);
  }

  addUpdateUserProfile(uprofile :  UserProfile,id: string) {


    if ((id == null) || (id == '')) {
      uprofile.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      uprofile.Username = this.auth.userProfile.name;
      //pjobc.JobTitle =
      // console.log ("Create Date ::: "+pjobc.CreatedDate);
      // console.log ("Created By ::: "+pjobc.CreatedBy);
      // console.log("NEW FORM ....Service");
      this.upCollection.add(uprofile);
    } else {
      console.log("UPDATE FORM ...." + id);
      //this.faqDoc = this.afs.doc(`faq/${faqc.id}`);
      this.upDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`);
      this.upDoc.update(uprofile);
    }
    //this.AlgoliaUpdate();
  }


  getUserDetails(user) {
    console.log("List Service ..... 3"+user);


    this.upCollection = this.afs.collection(FIREBASE_CONFIG.UserProfile, ref =>
          ref.where('Username','==',user));
          //console.log("List Service ..... 4");
    this.UserProfilec = this.upCollection.snapshotChanges().pipe(map(changes => {
      //console.log("List Service ..... 5");
      return changes.map(a => {
        //console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UserProfile;
        data.id = a.payload.doc.id;
        //console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.UserProfilec;
  }


  
  
}
