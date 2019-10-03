import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor() { }

  ngOnInit() {

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

    var fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]); 
    fileReader.onload = (_event) => { 
      this.imgURL = fileReader.result; 
    }
  }

  uploadImage() {

  }
}
