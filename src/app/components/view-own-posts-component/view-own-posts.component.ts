import { Component, OnInit } from '@angular/core';
import { ImageService } from "../../service/image.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-own-posts',
  templateUrl: './view-own-posts.component.html',
  styleUrls: ['./view-own-posts.component.css']
})
export class ViewOwnPostsComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private snackBar: MatSnackBar
  ) { }

  username: string;
  images: any;
  showSpinner: boolean = false;
  errorMessage: string;
  p: any;

  ngOnInit() {
    this.username = localStorage.getItem("token");
    this.imageService.getAllImages().subscribe(
      (res: any) => {
        this.images = Array.of(res);
        this.images = this.images[0];
        this.images.reverse();
        this.images = this.getPostsByUsename(this.images);
      },
      (err) => {
        this.openErrorSnackBar("Failed to load images, refresh the page to try again", "Error");
      }
    );
  }

  getPostsByUsename(images: any) {
    let userPosts = [];
    for (let image of images) {
      if (image.username === this.username) {
        userPosts.push(image);
      }
    }
    return userPosts;
  }

  deletePost(imgUrl: string){
    this.showSpinner = true;
    this.imageService.deleteImage(this.username, imgUrl).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        this.showSpinner = false;
        this.openErrorSnackBar("Deletion Failed", "Error");
 
      }
    )
  }

  imgURL: string | ArrayBuffer;
  uploadErrorMessage: string;

  // Function source: https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
  seeImage(files) {
    this.imgURL = "";
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
      this.imgURL = fileReader.result;
    }
  }

  sortType: string = "Old";

  changeSortType() {
    this.images.reverse();

    if (this.sortType === "Old") {
      this.sortType = "New"
    } else {
      this.sortType = "Old"
    }
  }


  // Code source from a tutorial by Filip Jerga: https://www.youtube.com/watch?v=wNqwExw-ECw
  changeImage(oldImageUrl, imageInput) {
    this.showSpinner = true;
    var file: File = imageInput.files[0];
    this.imageService.uploadImage(file).subscribe(
      (res: any) => {
        this.imageService.updateImage(oldImageUrl, res.imageUrl).subscribe(
          (res) => {
            window.location.reload();
          },
          (err) => {
            this.openErrorSnackBar("Change Failed", "Error");
            this.showSpinner = false;
          }
        );
      },
      (err) => {
        this.openErrorSnackBar("Change Failed", "Error");
        this.showSpinner = false;
      }
    );
  }

  replaceWithPlaceholder(oldImageUrl) {
    this.showSpinner = true;
    this.imageService.replaceWithPlaceholder(oldImageUrl).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        this.showSpinner = false;
        this.openErrorSnackBar("Replacement Failed", "Error");
      }
    );
  }

  // Code source angular material documentation example: https://material.angular.io/components/snack-bar/overview
  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
