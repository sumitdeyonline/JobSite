import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FileUpload } from './fileupload';
import * as firebase from 'firebase/app';
import 'firebase/storage';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//import { PostJobc } from './postjob.model';
//import { FIREBASE_CONFIG } from '../../global-config';
import { formatDate } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';



//import { SEARCH_CONFIG } from '../../global-config';


@Injectable({
  providedIn: 'root'
})
export class UploadResumeService {


  private basePath = FIREBASE_CONFIG.UploadPath; //'/uploads';
  private task: any;
  constructor(private db: AngularFireDatabase,  private auth: AuthService) { }



  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {


    const storageRef = firebase.storage().ref();

    if (this.auth.userProfile == null) {
      console.log('Null -> File Name ', "Generic_"+fileUpload.file.name);
      this.task =  storageRef.child(`${this.basePath}/${"Generic_"+fileUpload.file.name}`).put(fileUpload.file);
      //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    }
    else {
      console.log('Not Null -> File Name ', this.auth.userProfile.name+"_"+fileUpload.file.name);
      this.task = storageRef.child(`${this.basePath}/${this.auth.userProfile.name+"_"+fileUpload.file.name}`).put(fileUpload.file);
      //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    }

    //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    const uploadTask = this.task;

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {

        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);

      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {

          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;


          this.saveFileData(fileUpload);

        });

      }

    );

  }

  private saveFileData(fileUpload: FileUpload) {

    this.db.list(`${this.basePath}/`).push(fileUpload);

  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }


}
