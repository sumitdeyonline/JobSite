import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';

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
 
  
  constructor(private dialogRef: MatDialogRef<ApplyjobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private rUploadService: UploadResumeService)
    {

      this.applyJobForm =  fb.group({
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'PhoneNumber': '',
        'CoverLetter':'',
        'fileUpload':'',
      });

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

  applyNow(form:NgForm){
    console.log(form);
    this.close();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    console.log("this.selectedFiles.item(0) :::::: => "+this.selectedFiles.item(0).name);
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.filleUploadEnabled = true;
      this.currentFileUpload = new FileUpload(file);
      let filePath =`${FIREBASE_CONFIG.TempResume}/${"Resume_"+this.currentFileUpload.file.name.replace(".","_")}`;
      console.log("https://firebasestorage.googleapis.com/v0/b/jobsite-c8333.appspot.com/o"+filePath+"?alt=media");
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
