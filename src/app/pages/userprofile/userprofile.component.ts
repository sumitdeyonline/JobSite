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
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';



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
  userProfile: UserProfile[];
  isUpdate: boolean = false;


  constructor(private rUploadService: UploadResumeService, private uProfile: UserprofileService, private auth: AuthService) {


    this.uProfile.getUserDetails(this.auth.userProfile.name).subscribe(uprop=> {
      this.userProfile = uprop;
      this.resetForm();
      console.log("TEEESSSTTTTTTTTTT ");
      if (this.userProfile.length == 0) {

        console.log("NEW FORM ....");
        this.isUpdate = false;

      } else {
        console.log("Edit FORM .... FOR "+this.userProfile.length);
        this.fileUploadEnabled = true;
        this.isUpdate = true;
        this.uProfile.selectedUserProfile.FirstName = this.userProfile[0].FirstName;
        this.uProfile.selectedUserProfile.LastName = this.userProfile[0].LastName;
        this.uProfile.selectedUserProfile.Sex = this.userProfile[0].Sex;
        this.uProfile.selectedUserProfile.Email = this.userProfile[0].Email;
        this.uProfile.selectedUserProfile.HomePhone = this.userProfile[0].HomePhone;
        this.uProfile.selectedUserProfile.CellPhone = this.userProfile[0].CellPhone;
        this.uProfile.selectedUserProfile.Address1 = this.userProfile[0].Address1;
        this.uProfile.selectedUserProfile.Address2 = this.userProfile[0].Address2;
        this.uProfile.selectedUserProfile.City = this.userProfile[0].City;
        this.uProfile.selectedUserProfile.State = this.userProfile[0].State;
        this.uProfile.selectedUserProfile.ZipCode = this.userProfile[0].ZipCode;
        this.uProfile.selectedUserProfile.Country = this.userProfile[0].Country;
        this.uProfile.selectedUserProfile.FaceBookURL = this.userProfile[0].FaceBookURL;
        this.uProfile.selectedUserProfile.LinkedinURL = this.userProfile[0].LinkedinURL;

        this.uProfile.selectedUserProfile.PersonalWebsite = this.userProfile[0].PersonalWebsite;
        this.uProfile.selectedUserProfile.EmploymentType = this.userProfile[0].EmploymentType;
        this.uProfile.selectedUserProfile.DesiredPosition = this.userProfile[0].DesiredPosition;
        this.uProfile.selectedUserProfile.DesiredSalary = this.userProfile[0].DesiredSalary;
        this.uProfile.selectedUserProfile.IsRelocate = this.userProfile[0].IsRelocate;
        this.uProfile.selectedUserProfile.IsTravel = this.userProfile[0].IsTravel;
        this.uProfile.selectedUserProfile.YearsofExperince = this.userProfile[0].YearsofExperince;
        this.uProfile.selectedUserProfile.WorkAuthorization = this.userProfile[0].WorkAuthorization;
        this.uProfile.selectedUserProfile.SecurityClearance = this.userProfile[0].SecurityClearance;
        this.uProfile.selectedUserProfile.ResumeID = this.userProfile[0].ResumeID;
        this.uProfile.selectedUserProfile.ResumeFileName = this.userProfile[0].ResumeFileName;
        this.uProfile.selectedUserProfile.ResumeURL = this.userProfile[0].ResumeURL;
        this.uProfile.selectedUserProfile.ResumeExt = this.userProfile[0].ResumeExt;
        this.uProfile.selectedUserProfile.CoverLetter = this.userProfile[0].CoverLetter;
        this.uProfile.selectedUserProfile.institute = this.userProfile[0].institute;
        this.uProfile.selectedUserProfile.instituteCity = this.userProfile[0].instituteCity;
        this.uProfile.selectedUserProfile.instituteCountry = this.userProfile[0].instituteCountry;
        this.uProfile.selectedUserProfile.SkillSet = this.userProfile[0].SkillSet;
        this.uProfile.selectedUserProfile.Education = this.userProfile[0].Education;
        this.uProfile.selectedUserProfile.SalaryExpectation = this.userProfile[0].SalaryExpectation;
        this.uProfile.selectedUserProfile.UserID = this.userProfile[0].UserID;
        this.uProfile.selectedUserProfile.Username = this.userProfile[0].Username;
        this.uProfile.selectedUserProfile.CreatedDate = this.userProfile[0].CreatedDate;
        this.uProfile.selectedUserProfile.ModifiedDate = this.userProfile[0].ModifiedDate;
                       
        

        
      }

    })


  }

  ngOnInit() {



    // if ((this.id == null) || (this.id == '')) {
    //   console.log("NEW FORM ....");
    //   this.resetForm();
    // } else {
    //   console.log("UPDATE FORM ....");
    // }

  }

  userProfileSubmit(uprofileForm: NgForm) {
    console.log("Start Saveing ");

    if (this.isUpdate) {
      this.userProfileAddUpdate(uprofileForm, this.uProfile.selectedUserProfile.Username);
    } else {

      this.rUploadService.getFileUploads(Number(FIREBASE_CONFIG.TotalFile)).snapshotChanges().pipe(
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
            this.userProfileAddUpdate(uprofileForm, null);
            break;
          }
  
        }
  
      });
    }


    //this.getFilesWithDownloadURL(this.rUploadService.downloadURL);


    //this.uProfile.addUpdateUserProfile(uprofileForm.value,null);
  }


  userProfileAddUpdate(uprofileForm: NgForm, username: string) {

    console.log ('First Name  ::: '+ uprofileForm.value.FirstName);
    console.log ('LastName  ::: '+ uprofileForm.value.LastName);
    console.log ('Sex  ::: '+ uprofileForm.value.Sex);
    console.log ('Email  ::: '+ uprofileForm.value.Email);
    console.log ('HomePhone  ::: '+ uprofileForm.value.HomePhone);
    console.log ('CellPhone  ::: '+ uprofileForm.value.CellPhone);
    console.log ('Address1  ::: '+ uprofileForm.value.Address1);
    if (uprofileForm.value.Address2 == undefined) {
      uprofileForm.value.Address2 = "";
    }
    console.log ('Address2  ::: '+ uprofileForm.value.Address2);
    console.log ('City  ::: '+ uprofileForm.value.City);
    console.log ('State  ::: '+ uprofileForm.value.State);
    if (uprofileForm.value.FaceBookURL == undefined) {
      uprofileForm.value.FaceBookURL = "";
    }
    console.log ('FaceBookURL  ::: '+ uprofileForm.value.FaceBookURL);
    if (uprofileForm.value.LinkedinURL == undefined) {
      uprofileForm.value.LinkedinURL = "";
    }
    console.log ('LinkedinURL  ::: '+ uprofileForm.value.LinkedinURL);
    if (uprofileForm.value.PersonalWebsite == undefined) {
      uprofileForm.value.PersonalWebsite = "";
    }
    console.log ('PersonalWebsite  ::: '+ uprofileForm.value.PersonalWebsite);
    if (uprofileForm.value.EmploymentType == undefined) {
      uprofileForm.value.EmploymentType = "";
    }
    console.log ('EmploymentType  ::: '+ uprofileForm.value.EmploymentType);
    if (uprofileForm.value.DesiredPosition == undefined) {
      uprofileForm.value.DesiredPosition = "";
    }
    console.log ('DesiredPosition  ::: '+ uprofileForm.value.DesiredPosition);
    if (uprofileForm.value.DesiredSalary == undefined) {
      uprofileForm.value.DesiredSalary = "";
    }
    console.log ('DesiredSalary  ::: '+ uprofileForm.value.DesiredSalary);
    if (uprofileForm.value.IsRelocate == undefined) {
      uprofileForm.value.IsRelocate = false;
    }
    console.log ('IsRelocate  ::: '+ uprofileForm.value.IsRelocate);
    if (uprofileForm.value.IsTravel == undefined) {
      uprofileForm.value.IsTravel = false;
    }
    console.log ('IsTravel  ::: '+ uprofileForm.value.IsTravel);
    if (uprofileForm.value.YearsofExperince == undefined) {
      uprofileForm.value.YearsofExperince = "";
    }
    console.log ('YearsofExperince  ::: '+ uprofileForm.value.YearsofExperince);
    if (uprofileForm.value.WorkAuthorization == undefined) {
      uprofileForm.value.WorkAuthorization = "";
    }
    console.log ('WorkAuthorization  ::: '+ uprofileForm.value.WorkAuthorization);
    if (uprofileForm.value.SecurityClearance == undefined) {
      uprofileForm.value.SecurityClearance = "";
    }
    console.log ('SecurityClearance  ::: '+ uprofileForm.value.SecurityClearance);
    if (uprofileForm.value.CoverLetter == undefined) {
      uprofileForm.value.CoverLetter = "";
    }
    console.log ('CoverLetter  ::: '+ uprofileForm.value.CoverLetter);
    if (uprofileForm.value.institute == undefined) {
      uprofileForm.value.institute = "";
    }
    console.log ('institute  ::: '+ uprofileForm.value.institute);
    if (uprofileForm.value.instituteCity == undefined) {
      uprofileForm.value.instituteCity = "";
    }
    console.log ('instituteCity  ::: '+ uprofileForm.value.instituteCity);
    if (uprofileForm.value.instituteCountry == undefined) {
      uprofileForm.value.instituteCountry = "";
    }
    console.log ('instituteCountry  ::: '+ uprofileForm.value.instituteCountry);
    if (uprofileForm.value.SkillSet == undefined) {
      uprofileForm.value.SkillSet = "";
    }
    console.log ('SkillSet  ::: '+ uprofileForm.value.SkillSet);
    if (uprofileForm.value.Education == undefined) {
      uprofileForm.value.Education = "";
    }
    console.log ('Education  ::: '+ uprofileForm.value.Education);
    //console.log ('SalaryExpectation  ::: '+ uprofileForm.value.SalaryExpectation);

    console.log ('File Name   ::: '+ this.rUploadService.fileName);
    console.log ('File URL   ::: '+ this.rUploadService.downloadURL);

    this.fileUploadEnabled = true; // Enabled File Download

    if (username == null){
      uprofileForm.value.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      uprofileForm.value.ResumeID = this.uPloadFileKey;
      uprofileForm.value.ResumeFileName = this.rUploadService.fileName;
      uprofileForm.value.ResumeURL = this.rUploadService.downloadURL;
      uprofileForm.value.ResumeExt = this.rUploadService.fileName.substring(this.rUploadService.fileName.lastIndexOf(".")+1);
      uprofileForm.value.UserID = this.auth.userProfile.name;
      uprofileForm.value.Username = this.auth.userProfile.nickname;
  
      console.log ('CreatedDate  ::: '+ uprofileForm.value.CreatedDate);
      console.log ('ResumeID  ::: '+ uprofileForm.value.ResumeID);
      //console.log ('ResumeFileName  ::: '+ uprofileForm.value.ResumeFileName+' Extertion '+uprofileForm.value.ResumeFileName.substring(uprofileForm.value.ResumeFileName.length - 3,uprofileForm.value.ResumeFileName.length));
      console.log ('ResumeFileName  ::: '+ uprofileForm.value.ResumeFileName+' Extertion '+uprofileForm.value.ResumeFileName.substring(uprofileForm.value.ResumeFileName.lastIndexOf(".")+1));
  
      console.log ('ResumeURL  ::: '+ uprofileForm.value.ResumeURL);
      console.log ('ResumeExt  ::: '+ uprofileForm.value.ResumeExt);
      console.log ('UserID  ::: '+ uprofileForm.value.UserID);
      console.log ('Username  ::: '+ uprofileForm.value.Username);
      this.uProfile.addUpdateUserProfile(uprofileForm.value, null);
    } else {
      uprofileForm.value.ResumeID = this.uPloadFileKey;
      uprofileForm.value.ResumeFileName = this.rUploadService.fileName;
      uprofileForm.value.ResumeURL = this.rUploadService.downloadURL;
      uprofileForm.value.ResumeExt = this.rUploadService.fileName.substring(this.rUploadService.fileName.lastIndexOf(".")+1); 
      console.log ('CreatedDate  ::: '+ uprofileForm.value.CreatedDate);
      console.log ('ResumeID  ::: '+ uprofileForm.value.ResumeID);
      //console.log ('ResumeFileName  ::: '+ uprofileForm.value.ResumeFileName+' Extertion '+uprofileForm.value.ResumeFileName.substring(uprofileForm.value.ResumeFileName.length - 3,uprofileForm.value.ResumeFileName.length));
      console.log ('ResumeFileName  ::: '+ uprofileForm.value.ResumeFileName+' Extertion '+uprofileForm.value.ResumeFileName.substring(uprofileForm.value.ResumeFileName.lastIndexOf(".")+1));
  
      console.log ('ResumeURL  ::: '+ uprofileForm.value.ResumeURL);
      console.log ('ResumeExt  ::: '+ uprofileForm.value.ResumeExt);
      console.log ('UserID  ::: '+ uprofileForm.value.UserID);
      console.log ('Username  ::: '+ uprofileForm.value.Username);
      this.uProfile.addUpdateUserProfile(uprofileForm.value, username);           
    }



  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    console.log("this.selectedFiles.item(0) :::::: => "+this.selectedFiles.item(0).name);
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.selectedFiles = undefined;
      this.fileUploadEnabled = true;

      this.currentFileUpload = new FileUpload(file);
      this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress);
    } else {
      this.selectedFiles = undefined;
      this.fileUploadEnabled = false;
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
