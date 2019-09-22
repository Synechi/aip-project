import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  numResponses: number;
  username: string;
  image: string;

  constructor() {
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
}
