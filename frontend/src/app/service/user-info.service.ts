import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostData } from 'src/app/model/figure'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  baseUrl: string = 'https://192.168.8.1:3001'
  userInfoUrl: string = this.baseUrl  + "/users/symptoms"
  
  constructor(private http:HttpClient) { }

  postInfo(data: PostData):Observable<PostData> {
    return this.http.post<PostData>(this.userInfoUrl, data, httpOptions)
  }
}
