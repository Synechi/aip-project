// Code from a tutorial made by Filip Jerga: https://www.youtube.com/watch?v=wNqwExw-ECw
// Git repo containing code: https://github.com/Jerga99/book-with-me-ng/blob/master/src/app/shared/component/image-upload/image-upload.component.ts


import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ImageService {

    uri = "http://localhost:3000";

    constructor(private http: HttpClient){}

    public uploadImage(image: File) {
        var formData = new FormData();

        formData.append('image', image);

        return this.http.post(`${this.uri}/image-upload`, formData);
    }

    public storeImageUrl(username, imageUrl) {
        const imageInfo = {
            username: username,
            imageUrl: imageUrl
        }
        return this.http.post(`${this.uri}/save-url`, imageInfo);
    }
}