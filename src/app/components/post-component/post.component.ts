import { Component, OnInit } from '@angular/core';
import { ImageService } from "../../service/image.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  username: string;

  constructor(private imageService: ImageService) {}

  images: any;
  errorMessage: string;

  ngOnInit() {
    this.imageService.getAllImages().subscribe(
      (res: any) => {
        this.images = Array.of(res);
        this.images = this.images[0];
        this.images.reverse();
      },
      (err) => {
        this.errorMessage = "Failed to load images, refresh the page to try again."
      }
    );
  }



}
