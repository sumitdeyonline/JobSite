import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';



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

  constructor(private rUploadService: UploadResumeService, private uProfile: UserprofileService) { 

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
    console.log ("First Name  ::: "+uprofileForm.value.FirstName);
    uprofileForm.value.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    //this.uProfile.addUpdateUserProfile(uprofileForm.value,null);
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;


    this.currentFileUpload = new FileUpload(file);
    this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress);

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
