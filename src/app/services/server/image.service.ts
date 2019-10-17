import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Image {
  constructor(public link: string, public file: File) { }
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagesUrl = 'https://localhost:44345/images';

  constructor(
    private httpClient: HttpClient
    ) {}

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('useremail', localStorage.getItem('jwt:email'));
    return this.httpClient.post(
      this.imagesUrl + '/avatars',
      formData
    );
  }

  public getImages(): Observable<Image[]> {
    if (!localStorage.getItem('user:username')) {
      return this.httpClient.get<Image[]>(this.imagesUrl);
    }
    return this.httpClient.get<Image[]>(this.imagesUrl + '/' + localStorage.getItem('user:username'));
  }
}
