import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post, Reply } from 'src/app/models';
import { ForumService } from 'src/app/services/forum.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  @Input('p') posts: Post[] = []
  replies: Reply[] = []
  private service = inject(ForumService)
  private user = inject(UserServiceService)
  sub: Subscription

  private fb = inject(FormBuilder)
  reply: FormGroup

  wantToReply: boolean
  noReplies: boolean
  postId: string

  @Input('u') username: string

  createForm(){
    this.wantToReply = true
    this.reply = this.fb.group({
      "postId": this.fb.control<string>(this.postId),
      'username': this.fb.control<string>(this.username),
      'post': this.fb.control<string>('')
    })
    this.wantToReply = true
  }

  seeReplies(index: number) {
    if(this.posts.length > 1){
      let selectedPost = this.posts[index]
      console.log(selectedPost.id)
      console.log(selectedPost.post)
      this.posts = this.posts.filter(function (x) { return x === selectedPost })
      
      this.postId=this.posts[0].id
      console.log(this.postId)
      this.getAllRepliesByTopic()

    } else if (this.posts.length = 1) {
      this.postId = this.posts[0].id
      console.log(this.postId)
      this.getAllRepliesByTopic()

    } else {
      console.log("prevented deleting of just one post")      
    }
  }

  toggleReply(){
    if(this.wantToReply == true){
      this.wantToReply = false
    }
    this.wantToReply = true
  }

  getAllRepliesByTopic(){
    this.replies = []
    this.service.getAllRepliesOfPost(this.posts[0].id).subscribe({
      next: (response) => {
        for (let r of response) {
          console.log(r.post)
          let reply: Reply = r
          this.replies.push(reply)
          this.noReplies = false
        }
      },
      error: (err) => {
        console.log(err)
        this.noReplies = true
      }
    }
    )
  }

  submitReply(){

    this.reply.patchValue({
      "username": this.username,
      'postId' : this.postId
    })
    let r : Reply = this.reply.value
    console.log(this.reply.value)
    this.service.uploadReply(r).subscribe({
      next: (response) => {
        alert("Reply posting success with id of " + response),
        this.replies.push(r),
        this.wantToReply = false},
      error: (err) => { alert("Reply posting failed with id of" + err) }
    })
  }

  deletePost(id: string) {
    console.log(id)
    this.sub = this.service.deletePost(id).subscribe(
      {
        next: (response) => { 
          alert(response)
          for(let p of this.posts){
            if(p.id == id){
              const index = this.posts.indexOf(p, 0)
              this.posts.splice(index,1)
            }
          }
        },
        error: (err) => { console.log(err) },
        complete: () => this.sub.unsubscribe()
      }
    )
  }

}
