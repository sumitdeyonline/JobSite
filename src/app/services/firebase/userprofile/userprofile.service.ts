import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { UserProfile } from './userprofile.model';
import { Country } from './country.model';
import { State } from './state.model';
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

  countryCollection: AngularFirestoreCollection <Country>;
  countryProfilec: Observable<Country[]>;
  //cDoc: AngularFirestoreDocument<Country>;

  stateCollection: AngularFirestoreCollection <State>;
  stateProfilec: Observable<State[]>;

  userProfile = [];

  constructor(private afs : AngularFirestore, private auth: AuthService, private http: Http) {
    this.upCollection = this.afs.collection(FIREBASE_CONFIG.UserProfile);
    this.countryCollection = this.afs.collection(FIREBASE_CONFIG.Country);
    this.stateCollection = this.afs.collection(FIREBASE_CONFIG.State);
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
      this.upDoc = this.afs.doc(`${FIREBASE_CONFIG.UserProfile}/${id}`);
      this.upDoc.update(uprofile);
    }
    //this.AlgoliaUpdate();
  }


  getUserDetails(user) {
    console.log("List Service ..... 3 "+user);


    this.upCollection = this.afs.collection(FIREBASE_CONFIG.UserProfile, ref =>
          ref.where('Username','==',user));
          console.log("List Service ..... 4");
    this.UserProfilec = this.upCollection.snapshotChanges().pipe(map(changes => {
      console.log("List Service ..... 5");
      return changes.map(a => {
        console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UserProfile;
        data.id = a.payload.doc.id;
        console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.UserProfilec;
  }


  getCountry() {

    console.log("Country Name  ..... 0");
    this.countryCollection = this.afs.collection(FIREBASE_CONFIG.Country, ref1 =>  ref1.orderBy('CountryName','asc'));
          console.log("Country Name  ..... 1");
    this.countryProfilec = this.countryCollection.snapshotChanges().pipe(map(changes => {
      console.log("Country Name  ..... 2");
      return changes.map(a => {
        console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as Country;
        data.id = a.payload.doc.id;
        //console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.countryProfilec;
  }

  getStateDetails(country) {
    console.log("Country Name "+country);


    this.stateCollection = this.afs.collection(FIREBASE_CONFIG.State, ref =>
          ref.where('CountryName','==',country));
          //console.log("List Service ..... 4");
    this.stateProfilec = this.stateCollection.snapshotChanges().pipe(map(changes => {
      //console.log("List Service ..... 5");
      return changes.map(a => {
        //console.log("List Service ..... 6");
        const data = a.payload.doc.data() as State;
        data.id = a.payload.doc.id;
        //console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.stateProfilec;
  }

}
