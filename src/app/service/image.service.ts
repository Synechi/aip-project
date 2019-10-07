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

    public getAllImages() {
        return this.http.get(`${this.uri}/get-all-images`);
    }

    public deleteImage(username, imageUrl) {
        const imageInfo = {
            username: username,
            imageUrl: imageUrl
        }
        return this.http.post(`${this.uri}/delete-image`, imageInfo);
    }

    public updateImage(oldImageUrl, newimageUrl) {
        const imageInfo = {
            oldImageUrl: oldImageUrl,
            newImageUrl: newimageUrl
        }
        return this.http.post(`${this.uri}/update-image`, imageInfo);

    }

    public storeResponseImageUrl(username, parentImageUrl, imageUrl) {
        const responseImageInfo = {
            username: username,
            parentImageUrl: parentImageUrl,
            imageUrl: imageUrl
        }
        return this.http.post(`${this.uri}/save-response-image-url`, responseImageInfo);
    }

    public replaceWithPlaceholder(oldImageUrl) {
        const imageInfo = {
            oldImageUrl: oldImageUrl,
        }
        return this.http.post(`${this.uri}/replace-with-placeholder`, imageInfo);
    }
}