import { Component, OnInit } from '@angular/core';
import { UploadResumeService } from 'src/app/services/firebase/upload-resume.service';
import { FileUpload } from 'src/app/services/firebase/FileUpload';

@Component({
  selector: 'resumeupload',
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.css']
})
export class ResumeUploadComponent implements OnInit {

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
