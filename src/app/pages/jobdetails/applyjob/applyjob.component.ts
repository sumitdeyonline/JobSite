import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators ,FormsModule, NgForm } from '@angular/forms';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';



@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.css']
})
export class ApplyjobComponent implements OnInit {

  applyJobForm: FormGroup;
  selectedFiles: FileList;
  filleUploadEnabled: boolean = false;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  email: any;
  pjob: PostJobc;
  applyJob : ApplyJob;
  checkApplied: boolean = false;

  //email   = require("emailjs/email");


  constructor(private dialogRef: MatDialogRef<ApplyjobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private rUploadService: UploadResumeService, private auth: AuthService, private ajob: ApplyjobService)
    {
      //this.email   = require("emailjs");
      this.applyJobForm =  fb.group({
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'PhoneNumber': '',
        'CoverLetter':'',
        'fileUpload':'',
      });
      this.checkApplied = false;
      this.rUploadService.downloadURLTempResume = '';
      this.pjob = data;
      console.log("Apply To Email :::: " + this.pjob.ApplyToEmail);

    }

  ngOnInit() {
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.filleUploadEnabled = true;
    } else {
      this.filleUploadEnabled = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  applyNow(applynowform:NgForm){
    console.log(applynowform);
    console.log("Download URL :::::::: "+this.rUploadService.downloadURLTempResume);
    let username ='anonymous';
    if (this.auth.isAuthenticated()) {
      username = this.auth.userProfile.name;
    }
    //this.applyJob = new ApplyNow[];
     //this.applyJob.FirstName = applynowform.FirstName;
     this.applyJob = { FirstName: applynowform.FirstName,
                       LastName: applynowform.LastName,
                       FromEmail: applynowform.Email,
                       ApplyToEmail: this.pjob.ApplyToEmail,
                       CCToEmail:  this.pjob.CCToEmail,
                       ApplyToURL: this.pjob.ApplyToURL,
                       PhoneNumber: applynowform.PhoneNumber,
                       CoverLetter: applynowform.CoverLetter,
                       fileUploadURL: this.rUploadService.downloadURLTempResume,
                       JobID: this.pjob.id,
                       JobTitle: this.pjob.JobTitle,
                       username : username,
                       CreatedDate: new Date()

                     };

      console.log("User name ::: "+this.applyJob.username);
      console.log("Created Date ::: "+this.applyJob.CreatedDate);
      console.log("Download URL ::: "+this.applyJob.fileUploadURL);

      this.ajob.addUpdateApplyJobs(this.applyJob);
      this.checkApplied = true;

    //var email 	= require("./path/to/emailjs/email");
  //   var server 	= this.email.server.connect({
  //     user:	"hr@macgain.com",
  //     password:"Amitava1",
  //     host:	"smtp.ionos.com",
  //     port: "465",
  //     ssl:		true
  //  });
  //  server.send({
  //   text:    "i hope this works",
  //   from:    "hr@macgain.com",
  //   to:      "sumitdeyonline@gmail.com",
  //   cc:      "hr@macgain.com",
  //   subject: "testing emailjs"
  // }, function(err, message) { console.log(err || message); });

    //this.close();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    console.log("this.selectedFiles.item(0) :::::: => "+this.selectedFiles.item(0).name);
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.filleUploadEnabled = true;
      this.currentFileUpload = new FileUpload(file);
      //let filePath =`${FIREBASE_CONFIG.TempResume}/${"Resume_"+this.currentFileUpload.file.name.replace(".","_")}`;
      //console.log("https://firebasestorage.googleapis.com/v0/b/jobsite-c8333.appspot.com/o"+filePath+"?alt=media");
      this.rUploadService.pushTempResumeStorage(this.currentFileUpload, this.progress);
      console.log("Download URL "+this.rUploadService.downloadURLTempResume);

    } else {
      //this.isNewUpload = false;
      this.selectedFiles = undefined;
      this.filleUploadEnabled = false;
    }
  }

  validateFile(fileName: string) {
    let ext = fileName.substring(fileName.lastIndexOf('.')+1);
    console.log("EXTESTION :::::::$$$&&&&&&& "+ext);
    if ((ext.toLowerCase() == 'doc') || (ext.toLowerCase() == 'docx') || (ext.toLowerCase() == 'pdf') || (ext.toLowerCase() == 'ppt') || (ext.toLowerCase() == 'pptx')) {
      return true;
    } else {
      return false;
    }

  }

}
