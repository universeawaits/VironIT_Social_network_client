import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Image {
  constructor(public link: string, public file: File) { }
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagesUrl = environment.appUrl + 'images';

  constructor(
    private httpClient: HttpClient
    ) {}

  public updateAvatar(image: File) {
    return this.httpClient.post(
      this.imagesUrl + '/avatars',
      this.createFormData(image)
    );
  }

  public uploadImage(image: File) {
    return this.httpClient.post(
      this.imagesUrl,
      this.createFormData(image)
    );
  }

  private createFormData(image: File): FormData {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('useremail', localStorage.getItem('jwt:email'));

    return formData;
  }
}
