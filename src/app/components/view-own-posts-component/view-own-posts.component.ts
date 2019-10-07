import { Component, OnInit } from '@angular/core';
import { ImageService } from "../../service/image.service";

@Component({
  selector: 'app-view-own-posts',
  templateUrl: './view-own-posts.component.html',
  styleUrls: ['./view-own-posts.component.css']
})
export class ViewOwnPostsComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  username: string;
  images: any;
  errorMessage: string;

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
        this.errorMessage = "Failed to load images, refresh the page to try again."
      }
    );
  }

  getPostsByUsename(images: any){
    let userPosts = [];
    for (let image of images){
      if(image.username === this.username) {
        userPosts.push(image);
      }
    }
    return userPosts;
  }

  deletePost(imgUrl: string){
    this.imageService.deleteImage(this.username, imgUrl).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        this.errorMessage = "Deletion Failed" 
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

    if(this.sortType === "Old") {
      this.sortType = "New"
    } else {
      this.sortType = "Old"
    }
  }


  // Code source from a tutorial by Filip Jerga: https://www.youtube.com/watch?v=wNqwExw-ECw
  changeImage(oldImageUrl, imageInput) {
    var file: File = imageInput.files[0];
    this.imageService.uploadImage(file).subscribe(
      (res: any) => {
        this.imageService.updateImage(oldImageUrl, res.imageUrl).subscribe(
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

  replaceWithPlaceholder(oldImageUrl) {
    this.imageService.replaceWithPlaceholder(oldImageUrl).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        this.errorMessage = "Replacement Failed"
      }
    );
  }
}
