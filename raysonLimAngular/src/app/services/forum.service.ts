import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, Reply } from '../models';
import { firstValueFrom } from 'rxjs';
import { UserServiceService } from './user-service.service';

const apiUrl = "/posts"

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient, private user: UserServiceService) {
    }

    private token;

  uploadPostNoImage(p : Post){
    console.log("runnig post upload")
    this.token = localStorage.getItem("token")
    return this.http.post<any>(`${apiUrl}/upload`, p, {
      headers: {"authorization": "Bearer " + this.token}
    })
  }

  getAllPosts(){
    this.token = localStorage.getItem("token")
    return this.http.get<any>(`${apiUrl}/all`, {
      headers: { "authorization": "Bearer " + this.token }
    })
  }

  getPostsByTopic(topic: string){
    this.token = localStorage.getItem("token")
    return this.http.get<any>(`${apiUrl}/topic/${topic}`, {
      headers: { "authorization": "Bearer " + this.token }
    })
  }

  getPostsByUser(user: string){
    this.token = localStorage.getItem("token")
    return this.http.get<any>(`${apiUrl}/user/${user}`, {
      headers: { "authorization": "Bearer " + this.token }
    })
  }

  uploadPostWithImage(formData: FormData){
    this.token = localStorage.getItem("token")
    console.log("running upload with image")
    firstValueFrom(
      this.http.post<any>(`${apiUrl}/uploadPicture`, formData, {
        headers: { "authorization": "Bearer " + this.token }
      }
      )).then((response)=> {
        console.log(response)
        console.log("upload sucessful")
      }).catch((error) => {
        console.log(error)
      })
  }

  getAllRepliesOfPost(postId : string){
    this.token = localStorage.getItem("token")
    return this.http.get<any>(`${apiUrl}/replies/${postId}`, {
      headers: { "authorization": "Bearer " + this.token }
    })
  }

  uploadReply(reply: Reply){
    this.token = localStorage.getItem("token")
    return this.http.post<any>(`${apiUrl}/replies/post`, reply, {
      headers: { "authorization": "Bearer " + this.token }
    })
  }

  deletePost(id : string){
    this.token = localStorage.getItem("token")
    return this.http.delete<any> (`${apiUrl}/delete/${id}`,{
      headers: { "authorization": "Bearer " + this.token }
    })
  }
}
