import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';



@Component({
  selector: 'userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private resumeuploadService: UploadResumeService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;


    this.currentFileUpload = new FileUpload(file);
    this.resumeuploadService.pushFileToStorage(this.currentFileUpload, this.progress);
 
  }  

}
