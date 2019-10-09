import { Component, OnInit } from '@angular/core';
import { ImageService } from "../../service/image.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {


  constructor(
    private imageService: ImageService,
    private router: Router
  ) { }

  username: string;
  returnUrl: string;

  ngOnInit() {
    this.username = localStorage.getItem("token");
    this.returnUrl = "/home";
  }

  imgURL: string | ArrayBuffer;
  errorMessage: string;
 
  // Function source: https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
  seeImage(files) {
    this.imgURL = "";
    this.errorMessage = "";
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.errorMessage = "Only images can be uploaded";
      return;
    }
    if (files[0].size > 2000000) {        // If file is greater then 2MB
      this.errorMessage = "Image is too large";
      return;
    }

    var fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]); 
    fileReader.onload = (_event) => { 
      this.imgURL = fileReader.result; 
    }
  }


  showSpinner: boolean =  false;
  // Code source from a tutorial by Filip Jerga: https://www.youtube.com/watch?v=wNqwExw-ECw
  uploadImage(imageInput) {
    this.showSpinner = true;
    var file = imageInput.files[0];
    this.imageService.uploadImage(file).subscribe(
      (res: any) => {
        this.imageService.storeImageUrl(this.username, res.imageUrl).subscribe(
          (res) => {
            this.router.navigate([this.returnUrl]);
          },
          (err) => {
            this.showSpinner = false;
            this.errorMessage = "Upload Failed"
          }
        );
      },
      (err) => {
        this.showSpinner = false;
        this.errorMessage = "Upload Failed"
      }
    );
  }
}
