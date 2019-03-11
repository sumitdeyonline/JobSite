import { AuthService } from 'src/app/services/authentication/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { ApplyJob } from './applyjob.model';


@Injectable({
  providedIn: 'root'
})
export class ApplyjobService {

  ajCollection: AngularFirestoreCollection <ApplyJob>;
  ApplyJobc: Observable<ApplyJob[]>;

  constructor(private auth: AuthService, private afs : AngularFirestore) {
    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob);
  }

  addUpdateApplyJobs(ajobc :  ApplyJob) {
    this.ajCollection.add(ajobc).then((entry) => {
      console.log("Entry is "+entry.id);
    })
  }


}
