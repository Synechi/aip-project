// Code from a tutorial made by Filip Jerga: https://www.youtube.com/watch?v=wNqwExw-ECw
// Git repo containing code: https://github.com/Jerga99/book-with-me-ng/blob/master/src/app/shared/component/image-upload/image-upload.component.ts


import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ImageService {

  uri = "https://aip-restapi.herokuapp.com";

  constructor(private http: HttpClient) { }

  // Request to store image and return amazon s3 image URL 
  public uploadImage(image: File) {
    var formData = new FormData();

    formData.append('image', image);

    return this.http.post(`${this.uri}/image-upload`, formData);
  }

  // Request to store image url and uploader's username in mongoDB
  public storeImageUrl(username, imageUrl) {
    const imageInfo = {
      username: username,
      imageUrl: imageUrl
    }
    return this.http.post(`${this.uri}/save-url`, imageInfo);
  }

  // Retrieve a JSON object containing all image urls and uploader usernames
  public getAllImages() {
    return this.http.get(`${this.uri}/get-all-images`);
  }

  // Request to delete an image using using the imageUrl
  public deleteImage(username, imageUrl) {
    const imageInfo = {
      username: username,
      imageUrl: imageUrl
    }
    return this.http.post(`${this.uri}/delete-image`, imageInfo);
  }

  // Request to replace the old image url with new
  public updateImage(oldImageUrl, newimageUrl) {
    const imageInfo = {
      oldImageUrl: oldImageUrl,
      newImageUrl: newimageUrl
    }
    return this.http.post(`${this.uri}/update-image`, imageInfo);
  }

  // Request to response image url
  public storeResponseImageUrl(username, parentImageUrl, imageUrl) {
    const responseImageInfo = {
      username: username,
      parentImageUrl: parentImageUrl,
      imageUrl: imageUrl
    }
    return this.http.post(`${this.uri}/save-response-image-url`, responseImageInfo);
  }

  // Request to replace image with placeholder
  public replaceWithPlaceholder(oldImageUrl) {
    const imageInfo = {
      oldImageUrl: oldImageUrl,
    }
    return this.http.post(`${this.uri}/replace-with-placeholder`, imageInfo);
  }
}