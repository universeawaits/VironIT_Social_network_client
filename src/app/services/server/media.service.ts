import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageMedia } from 'src/app/model/message-media';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private hostUrl = environment.appUrl;

  constructor(
    private httpClient: HttpClient
    ) { }

  uploadFile(file: File, type: string): Observable<MessageMedia> {
    return this.httpClient.post<MessageMedia>(
      this.hostUrl + this.getControllerByType(type), 
      this.createFormData(file), 
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token') }}
      );
  }

  private createFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);

    return formData;
  }

  private getControllerByType(type: string): string {
    if (type.includes('image')) {
      return 'images';
    }
    
    if (type.includes('video')) {
      return 'videos';
    }

    if (type.includes('audio')) {
      return 'audios';
    }
  }
}
