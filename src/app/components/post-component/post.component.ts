import { Component, OnInit, Inject } from '@angular/core';
import { ImageService } from "../../service/image.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  reportReason: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    public dialog: MatDialog
  ) {}

  images: any;
  errorMessage: string;
  username: string;
  toggleResponsesBools;  

  ngOnInit() {
    this.username = localStorage.getItem("token");

    this.imageService.getAllImages().subscribe(
      (res: any) => {
        this.images = Array.of(res);
        this.images = this.images[0];
        this.images.reverse();

        this.toggleResponsesBools = new Array(this.images.length);
        this.toggleResponsesBools.fill(false);
      },
      (err) => {
        this.errorMessage = "Failed to load images, refresh the page to try again."
      }
    );
  }

  toggleResponses(imageIndex) {
    console.log(imageIndex);
    this.toggleResponsesBools[imageIndex] = !this.toggleResponsesBools[imageIndex];
  }

  imgURL: string | ArrayBuffer;

  // Function source: https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
  seeImage(files) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]); 
    fileReader.onload = (_event) => { 
      this.imgURL = fileReader.result; 
    }
  }

  uploadResponse() {

  }

  // Code retrieved from material dialog documentation: https://material.angular.io/components/dialog/overview
  reportReason: string;
  openDialog() {
    const dialogRef = this.dialog.open(ReportPost, {
      width: '30%',
      data: {reportReason: this.reportReason}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.reportReason = result;       // Report reason input is retrieved here
    });
  }

}


// Code retrieved from material dialog documentation: https://material.angular.io/components/dialog/overview
@Component({
  selector: 'report-post',
  templateUrl: 'report-post.html',
  styleUrls: ['report-post.css']
})
export class ReportPost {
  constructor(public dialogRef: MatDialogRef<ReportPost>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }  
}
