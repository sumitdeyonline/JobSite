import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { map } from 'rxjs/operators';
//import { exists } from 'fs';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';



@Component({
  selector: 'userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: any;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: any[];
  uPloadFileKey: String;
  fileUploadEnabled: boolean = false;
  uProfileMessage: String ='';

  constructor(private rUploadService: UploadResumeService, private uProfile: UserprofileService, private auth: AuthService) {

    if ((this.id == null) || (this.id == '')) {
      console.log("NEW FORM ....");
      this.resetForm();
    } else {
      console.log("UPDATE FORM ....");
    }
  }

  ngOnInit() {
  }

  userProfileSubmit(uprofileForm: NgForm) {
    //this.getFilesWithDownloadURL(this.rUploadService.downloadURL);
    this.rUploadService.getFileUploads(FIREBASE_CONFIG.TotalFile).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log("File Upload Leanth =============================== "+this.fileUploads.length)
      for(let i=0;i<this.fileUploads.length; i++){

        if (this.rUploadService.downloadURL == this.fileUploads[i].url) {
          this.uPloadFileKey = this.fileUploads[i].key;
          console.log("File Key :::::::: " +this.fileUploads[i].key);
          console.log("File URL :::::::: " +this.fileUploads[i].url);
          console.log("File Name :::::::: " +this.fileUploads[i].name);
          this.userProfileAddUpdate(uprofileForm);
          break;
        }

      }

    });

    //this.uProfile.addUpdateUserProfile(uprofileForm.value,null);
  }


  userProfileAddUpdate(uprofileForm: NgForm) {

    console.log ('First Name  ::: '+ uprofileForm.value.FirstName);
    console.log ('LastName  ::: '+ uprofileForm.value.LastName);
    console.log ('Sex  ::: '+ uprofileForm.value.Sex);
    console.log ('Email  ::: '+ uprofileForm.value.Email);
    console.log ('HomePhone  ::: '+ uprofileForm.value.HomePhone);
    console.log ('CellPhone  ::: '+ uprofileForm.value.CellPhone);
    console.log ('Address1  ::: '+ uprofileForm.value.Address1);
    console.log ('Address2  ::: '+ uprofileForm.value.Address2);
    console.log ('City  ::: '+ uprofileForm.value.City);
    console.log ('State  ::: '+ uprofileForm.value.State);
    console.log ('FaceBookURL  ::: '+ uprofileForm.value.FaceBookURL);
    console.log ('LinkedinURL  ::: '+ uprofileForm.value.LinkedinURL);
    console.log ('PersonalWebsite  ::: '+ uprofileForm.value.PersonalWebsite);
    console.log ('EmploymentType  ::: '+ uprofileForm.value.EmploymentType);
    console.log ('DesiredPosition  ::: '+ uprofileForm.value.DesiredPosition);
    console.log ('DesiredSalary  ::: '+ uprofileForm.value.DesiredSalary);
    console.log ('IsRelocate  ::: '+ uprofileForm.value.IsRelocate);
    console.log ('IsTravel  ::: '+ uprofileForm.value.IsTravel);
    console.log ('YearsofExperince  ::: '+ uprofileForm.value.YearsofExperince);
    console.log ('WorkAuthorization  ::: '+ uprofileForm.value.WorkAuthorization);
    console.log ('SecurityClearance  ::: '+ uprofileForm.value.SecurityClearance);

    console.log ('CoverLetter  ::: '+ uprofileForm.value.CoverLetter);
    console.log ('institute  ::: '+ uprofileForm.value.institute);
    console.log ('instituteCity  ::: '+ uprofileForm.value.instituteCity);
    console.log ('instituteCountry  ::: '+ uprofileForm.value.instituteCountry);
    console.log ('SkillSet  ::: '+ uprofileForm.value.SkillSet);
    console.log ('Education  ::: '+ uprofileForm.value.Education);
    //console.log ('SalaryExpectation  ::: '+ uprofileForm.value.SalaryExpectation);
    console.log ('File Name   ::: '+ this.rUploadService.fileName);
    console.log ('File URL   ::: '+ this.rUploadService.downloadURL);

    this.fileUploadEnabled = true; // Enabled File Download

    uprofileForm.value.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    uprofileForm.value.ResumeID = this.uPloadFileKey;
    uprofileForm.value.ResumeFileName = this.rUploadService.fileName;
    uprofileForm.value.ResumeURL = this.rUploadService.downloadURL;
    uprofileForm.value.UserID = this.auth.userProfile.name;
    uprofileForm.value.Username = this.auth.userProfile.nickname;

    console.log ('CreatedDate  ::: '+ uprofileForm.value.CreatedDate);
    console.log ('ResumeID  ::: '+ uprofileForm.value.ResumeID);
    console.log ('ResumeFileName  ::: '+ uprofileForm.value.ResumeFileName);
    console.log ('ResumeURL  ::: '+ uprofileForm.value.ResumeURL);
    console.log ('UserID  ::: '+ uprofileForm.value.UserID);
    console.log ('Username  ::: '+ uprofileForm.value.Username);
    this.uProfile.addUpdateUserProfile(uprofileForm.value, null);

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.fileUploadEnabled = true;

    this.currentFileUpload = new FileUpload(file);
    this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress);

  }

  deleteFileUpload(fileUpload) {
    this.rUploadService.deleteFileUpload(fileUpload);
  }


  getFilesWithDownloadURL(dUrl: String) {
    //this.fileUploadEnabled = true; // Enabled File Download
    this.rUploadService.getFileUploads(100000000).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log("File Upload Leanth =============================== "+this.fileUploads.length)
      for(let i=0;i<this.fileUploads.length; i++){

        if (dUrl == this.fileUploads[i].url) {
          this.uPloadFileKey = this.fileUploads[i].key;
          console.log("File Key :::::::: " +this.fileUploads[i].key);
          console.log("File URL :::::::: " +this.fileUploads[i].url);
          console.log("File Name :::::::: " +this.fileUploads[i].name);
          break;
        }

      }

    });

  }

  resetForm(uprofileForm?: NgForm) {
    if (uprofileForm !=null)
    uprofileForm.reset();
      this.uProfile.selectedUserProfile = {
        //id: '',
        // question: '',
        // answer: '',
        // category: '',
        // details: ''
      }

  }

}
