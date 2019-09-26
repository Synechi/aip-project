import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  reportReason: string;
}

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  numResponses: number;
  username: string;
  image: string;

  constructor(public dialog: MatDialog) {
    this.username = "Name goes here";
    this.numResponses = 0;
    this.image = "/assets/flower.jpg"
   }

  ngOnInit() {
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

  uploadImage() {

  }


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

@Component({
  selector: 'report-post',
  templateUrl: 'report-post.html',
  styleUrls: ['report-post.css']
})
export class ReportPost {
  constructor(public dialogRef: MatDialogRef<ReportPost>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }  
}


