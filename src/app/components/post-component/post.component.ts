import { Component, OnInit, Inject, Input } from '@angular/core';
import { ImageService } from "../../service/image.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ReportDialogData {
  reportReason: string;
}

export interface CreateResponseDialogData {
  parentImageUrl: string | ArrayBuffer;
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
  ) { }

  images: any;
  errorMessage: string;
  currentUser: string;
  toggleResponsesBools: any;
  postsLoaded: Promise<boolean>;
  ngOnInit() {
    this.currentUser = localStorage.getItem("token");

    this.imageService.getAllImages().subscribe(
      (res: any) => {
        this.images = Array.of(res);
        this.images = this.images[0];
        this.images.reverse();

        this.toggleResponsesBools = new Array(this.images.length);
        this.toggleResponsesBools.fill(false);
        this.postsLoaded = Promise.resolve(true);
      },
      (err) => {
        this.errorMessage = "Failed to load images, refresh the page to try again."
        this.postsLoaded = Promise.resolve(true);
      }
    );
  }

  toggleResponses(imageIndex) {
    this.toggleResponsesBools[imageIndex] = !this.toggleResponsesBools[imageIndex];
  }

  sortType: string = "Old";

  changeSortType() {
    this.images.reverse();
    this.toggleResponsesBools.reverse();

    if (this.sortType === "Old") {
      this.sortType = "New"
    } else {
      this.sortType = "Old"
    }
  }

  // Code retrieved from material dialog documentation example: https://material.angular.io/components/dialog/overview
  reportReason: string;
  openReportPostDialog() {
    const dialogRef = this.dialog.open(ReportPost, {
      width: '30%',
      data: { reportReason: this.reportReason }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.reportReason = result;       // Report reason input is retrieved here
    });
  }


  openCreateResponseDialog(parentImageUrl) {
    const dialogRef = this.dialog.open(CreateResponse, {
      width: '50%',
      data: { parentImageUrl: parentImageUrl }
    });

    dialogRef.afterClosed().subscribe(result => {   // Image file is retrieved here
      if (result) {
        this.uploadResponseImage(result);
      }
    });
  }

  // Upload image to amason s3, if successful save url to mongodb
  uploadResponseImage(imageInput) {
    var file: File = imageInput.file;
    var parentImageUrl = imageInput.parentImageUrl
    this.imageService.uploadImage(file).subscribe(
      (res: any) => {
        this.imageService.storeResponseImageUrl(this.currentUser, parentImageUrl, res.imageUrl).subscribe(
          (res) => {
            window.location.reload();
          },
          (err) => {
            this.errorMessage = "Upload Failed"
          }
        );
      },
      (err) => {
        this.errorMessage = "Upload Failed"
      }
    );
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
    @Inject(MAT_DIALOG_DATA) public data: ReportDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'create-response',
  templateUrl: 'create-response.html',
  styleUrls: ['create-response.css']
})
export class CreateResponse {
  constructor(public dialogRef: MatDialogRef<CreateResponse>,
    @Inject(MAT_DIALOG_DATA) public data: CreateResponseDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  imageInfo: any;
  imgUrl: string | ArrayBuffer;
  uploadErrorMessage: string;

  // Function source: https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
  seeImage(files) {
    this.imgUrl = "";
    this.uploadErrorMessage = "";
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.uploadErrorMessage = "Only images can be uploaded";
      return;
    }
    if (files[0].size > 2000000) {        // If file is greater then 2MB
      this.uploadErrorMessage = "Image is too large";
      return;
    }

    var fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (_event) => {
      this.imgUrl = fileReader.result;
    }

    this.imageInfo = {
      file: files[0],
      parentImageUrl: this.data.parentImageUrl
    }
  }
}

