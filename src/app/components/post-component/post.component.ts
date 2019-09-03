import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  numResponses: number;
  username: string;
  image: string;

  constructor() { 
    this.username = "Test";
    this.numResponses = 0;
    this.image = "/assets/flower.jpg"
  }

  ngOnInit() {
  }

}
