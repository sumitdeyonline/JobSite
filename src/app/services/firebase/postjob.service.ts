import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { PostJobc } from './postjob.model';
import { FIREBASE_CONFIG } from '../../global-config';
import { formatDate } from '@angular/common';
import { AuthService } from '../authentication/auth.service';


@Injectable()
export class PostjobService {

  //selectedPostJob: PostJobc;

  selectedPostJobc: PostJobc;
  pjCollection: AngularFirestoreCollection <PostJobc>;
  PostJobc: Observable<PostJobc[]>;
  pjDoc: AngularFirestoreDocument<PostJobc>;

  constructor(private afs : AngularFirestore, private auth: AuthService) {
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


  addUpdatePostJobs(pjobc :  PostJobc,id: string) {


    if ((id == null) || (id == '')) {
      pjobc.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      pjobc.CreatedBy = this.auth.userProfile.name;
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
