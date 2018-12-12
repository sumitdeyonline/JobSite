import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { PostJobc } from './postjob.model';

import { formatDate } from '@angular/common';


import * as algoliasearch from 'algoliasearch';

import { Http } from "@angular/http";
import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG, SEARCH_CONFIG } from 'src/app/global-config';



@Injectable()
export class PostjobService {

  //selectedPostJob: PostJobc;

  selectedPostJobc: PostJobc;
  pjCollection: AngularFirestoreCollection <PostJobc>;
  PostJobc: Observable<PostJobc[]>;
  pjDoc: AngularFirestoreDocument<PostJobc>;


  client: any;
  index: any;
  private headers
  // ALGOLIA_APP_ID = "8I5VGLVBT1";
  // ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  //searchQuery: string ="sumitdey@yahoo.com" ;
  jobs = []; 

  constructor(private afs : AngularFirestore, private auth: AuthService, private http: Http) {
    this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob);
    //this.faqList = this.firebase.list('faq');
    //this.faqs = this.afs.collection('faq').valueChanges();
    //console.log("List Service ..... 1");
    // this.faqCollection = this.afs.collection(FIREBASE_CONFIG.Faq, ref => ref.orderBy(FIREBASE_CONFIG.OrderByFaq,'asc'));
    // this.faqs = this.faqCollection.snapshotChanges().map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Faqc;
    //     data.id = a.payload.doc.id;
    //     //console.log("List Service ..... 2");
    //     return data;
    //   });
    // });
  }


  getPostJobs(keyword, location) {
    console.log("Keyword : "+keyword+"  Location : "+location);

    const end = keyword + '\uf8ff';

    this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob, ref =>

       ref
        .orderBy('JobTitle')
        .startAt(keyword.toLowerCase()) //);
        .endAt(end.toLowerCase()));

          //ref.where('JobTitle','>=',keyword).orderBy(FIREBASE_CONFIG.OrderByPostJob,'asc'));
          // console.log("List Service ..... 4");
    this.PostJobc = this.pjCollection.snapshotChanges().pipe(map(changes => {
      console.log("List Service ..... 5");
      return changes.map(a => {
        console.log("List Service ..... 6");
        const data = a.payload.doc.data() as PostJobc;
        data.id = a.payload.doc.id;
        console.log("List Service 11111 ..... 2");
        return data;
      });
    }));




    return this.PostJobc;
  }


  getPostJobsAlgolia(keyword, location) {


    // this.client = algoliasearch(this.ALGOLIA_APP_ID, this.ALGOLIA_API_KEY,
    //   { protocol: 'https:' });
    //   console.log("Test 1 ....1" );
    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });



      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);
      console.log("Test 1 ....2..2" );

      this.index.search({

        query: keyword,
        //query: '{ JobState:CA }',
        //attributesToRetrieve: ['JobTitle', 'JobDesc']

        // restrictSearchableAttributes: [
        //   'JobTitle',
        //   'JobDesc'
        // ]
        //filters: 'JobState=CA'

      })
      .then((data) => {
        this.jobs = data.hits;
        for(let i=0;i<this.jobs.length;i++) {
          console.log("Algolia Job ::::::::: =>  "+this.jobs[i].JobState);
          console.log("Algolia Job ::::::::: =>  "+this.jobs[i].JobTitle);
        }
        return this.jobs;
      })
      return this.jobs;
  }

  // this.faqs = this.faqCollection.snapshotChanges().map(changes => {
  //   return changes.map(a => {
  //     const data = a.payload.doc.data() as Faqc;
  //     data.id = a.payload.doc.id;
  //     console.log("List Service ..... 2");
  //     return data;
  //   });
  // });



  addUpdatePostJobs(pjobc :  PostJobc,id: string) {


    if ((id == null) || (id == '')) {
      pjobc.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      pjobc.CreatedBy = this.auth.userProfile.name;
      pjobc.isSearchable = true;
      //pjobc.JobTitle =
      // console.log ("Create Date ::: "+pjobc.CreatedDate);
      // console.log ("Created By ::: "+pjobc.CreatedBy);
      // console.log("NEW FORM ....Service");
      this.pjCollection.add(pjobc);
    } else {
      console.log("UPDATE FORM ...." + id);
      //this.faqDoc = this.afs.doc(`faq/${faqc.id}`);
      this.pjDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`);
      this.pjDoc.update(pjobc);
    }
    this.AlgoliaUpdate();

  }

  AlgoliaUpdate() {
    //let params: URLSearchParams = new URLSearchParams();
    //let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE' });
    //let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*');

    // let headers: HttpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*'
    // });
    //let options = new RequestOptions({headers :headers})

    console.log("Algolia update"+SEARCH_CONFIG.ALGOLIA_FUNCTION_URL);
    // return this.http.post(SEARCH_CONFIG.ALGOLIA_FUNCTION_URL, {header: headers})
    //           .toPromise()
    //           .then( res => {
    //             console.log("Good : "+res);
    //           })
    //           .catch(err => {
    //             console.log("Error:::: "+err);
    //           });

    this.headers = new Headers();
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Access-Control-Allow-Origin', '*');

    //var allowCrossDomain = function(req, res, next) {
      this.headers.append('Access-Control-Allow-Origin', "http://localhost:4200");
      this.headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
  //};


              return this.http.get(SEARCH_CONFIG.ALGOLIA_FUNCTION_URL, { headers: this.headers })
              .toPromise()
              .then(response => response.json())
              .catch(err => {
                console.log("Error:::: "+err);
              });
  }


  getPostJobsByUser(user) {
    console.log("List Service ..... 3"+this.PostJobc);


    this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob, ref =>
          ref.where('CreatedBy','==',user).orderBy('CreatedDate','desc'));
          //console.log("List Service ..... 4");
    this.PostJobc = this.pjCollection.snapshotChanges().pipe(map(changes => {
      //console.log("List Service ..... 5");
      return changes.map(a => {
        //console.log("List Service ..... 6");
        const data = a.payload.doc.data() as PostJobc;
        data.id = a.payload.doc.id;
        //console.log("List Service 11111 ..... 2");
        return data;
      });
    }));



    // this.faqs = this.faqCollection.snapshotChanges().map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Faqc;
    //     data.id = a.payload.doc.id;
    //     console.log("List Service ..... 2");
    //     return data;
    //   });
    // });


    return this.PostJobc;
  }

  getPostJobsById(id) {
    console.log("List Service ..... 3 ::::::=> "+id);

    return this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`).valueChanges()

    // this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob, ref =>
    //       ref.where('id','==',id));
    //       console.log("List Service ..... 4 "+id);
    // this.PostJobc = this.pjCollection.snapshotChanges().pipe(map(changes => {
    //   console.log("List Service ..... 5");
    //   return changes.map(a => {
    //     console.log("List Service ..... 6");
    //     const data = a.payload.doc.data() as PostJobc;
    //     data.id = a.payload.doc.id;
    //     console.log("List Service 11111 ..... 2");
    //     return data;
    //   });
    // }));
    // return this.PostJobc;

    // this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob+id);
    // this.PostJobc = this.pjCollection.snapshotChanges().pipe(map(changes => {
    //   console.log("List Service ..... 5");
    //   return changes.map(a => {
    //     console.log("List Service ..... 6");
    //     const data = a.payload.doc.data() as PostJobc;
    //     data.id = a.payload.doc.id;
    //     console.log("List Service 11111 ..... 2");
    //     return data;
    //   });
    // }));
    // return this.PostJobc;


  }

  deletePostJob(faqc :  PostJobc) {
    this.pjDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${faqc.id}`);
    this.pjDoc.delete();
  }

  // OLD

  /*getData(listpath) {

    return this.firebase.list(listpath).valueChanges();
    //return this.firebase.list(listpath, )
    //return this.faqList;
  }



  insertFaq(faq :  Faq)
  {
    console.log("Question :::: "+faq.question);
    console.log("Answer :::: "+faq.answer);
    console.log("Category :::: "+faq.category);
    console.log("Details :::: "+faq.details);

    this.faqList.push({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      details : faq.details
    });
  }
  updateFaq(faq :  Faq) {
    this.faqList.update(faq.$key,
    {
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      details : faq.details
    })
  }*/
}
