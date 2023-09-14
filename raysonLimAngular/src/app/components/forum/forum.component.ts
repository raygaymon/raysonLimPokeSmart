import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon, PokemonBuild, Post } from 'src/app/models';
import { ForumService } from 'src/app/services/forum.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { ForumPopupComponent } from '../forum-popup/forum-popup.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  private fb = inject(FormBuilder)
  post: FormGroup
  pokemonBuild: FormGroup
  @ViewChild('file') imageFile: ElementRef
  sub!: Subscription

  private service = inject(ForumService)
  private pokemon = inject(PokemonService)
  private router = inject(Router)
  private dialogRef = inject(MatDialog)

  token: string
  username: string

  //TODO: add username to reply auto; clean up aesthetic

  posts: Post[] = []
  topics: string[] = ['Show Off', 'Looking For Help', 'Rate My Build']
  chosenTopic: string
  errMsg: string

  gotPicture: boolean = false
  chooseAction: number

  pkmn: Pokemon
  moves: string[] = []
  imageurl : string

  ngOnInit(): void {

    this.token = localStorage.getItem("token")
    this.username = localStorage.getItem("username")
    console.log(this.token)

    this.post = this.fb.group({
      'username': this.fb.control<string>('', Validators.required),
      'topic': this.fb.control<string>('Show Off', Validators.required),
      'post': this.fb.control<string>('', Validators.required)
    })

    this.createPokemonBuild()

  }

  uploadPic() {

    const formData = new FormData();
    formData.set('username', this.username);
    formData.set('topic', this.post.value['topic']);
    formData.set('post', this.post.value['post']);
    formData.set('file', this.imageFile.nativeElement.files[0]);

    this.service.uploadPostWithImage(formData)
    this.dialogRef.open(ForumPopupComponent, {
      data: {
        'message': "Post successfully posted!"
      }
    })
    this.post.reset()
    
  }

  checkIfFileUploaded() {
    let file = this.imageFile.nativeElement.files[0]
    console.log("eheheheheh")
    if (file) {
      console.log("there is a file uploaded")
      this.gotPicture = true
    }
  }

  submit() {
    console.log(this.post.value)
    this.post.patchValue({
      "username": this.username
    })
    console.log(this.post.value)

    let p: Post = this.post.value
    this.sub = this.service.uploadPostNoImage(p).subscribe({
      next: () => { 
          this.dialogRef.open(ForumPopupComponent, {

            data: {
              'message': "Post successfully posted!"
            }
          }),
          this.post.reset()
        },
      error: (err) => { this.errMsg = err.error.message },
      complete: () => this.sub.unsubscribe
    })
  }

  getPostsByTopic(topic: string) {
    this.posts = []
    this.sub = this.service.getPostsByTopic(topic).subscribe(
      {
        next: (response) => {
          for (let p of response) {
            let post = p
            if(post.topic =="Rate My Build"){
              let pokeBuild: PokemonBuild = JSON.parse(p.post)
              console.log(pokeBuild)
              post.pokeBuild = pokeBuild
            }
            if (!this.posts.includes(post)) {
              this.posts.push(post)
            }
          }
        },
        error: (err) => {
          console.log(err.error)
          this.errMsg = "There are no posts for this topic"
        },
        complete: () => this.sub.unsubscribe()
      })
  }

  getPostsByUser(user: string) {
    this.posts = []
    this.sub = this.service.getPostsByUser(user).subscribe(
      {
        next: (response) => {
          for (let p of response) {
            let post = p
            console.log(post.topic)
            if (post.topic == "Rate My Build") {
              let pokeBuild: PokemonBuild = JSON.parse(p.post)
              console.log(pokeBuild)
              post.pokeBuild = pokeBuild
            }
            if (!this.posts.includes(post)) {
              this.posts.push(post)
            }
          }
        },
        error: (err) => {
          console.log(err.error)
          this.errMsg ="There are no posts from you. Make one now!"
        },
        complete: () => this.sub.unsubscribe()
      })
  }

  goToLogin() {
    this.router.navigate(['/register-login'])
  }

  toggleCreate() {
    this.posts = []
    this.chooseAction = 1
  }
  toggleSeeTopics() {
    this.chooseAction = 2
  }
  toggleSeeOwnPosts() {
    this.chooseAction = 3
    this.getPostsByUser(this.username)
  }


  createPokemonBuild() {
    this.pokemonBuild = this.fb.group({
      'name': this.fb.control<string>('', Validators.required),
      'move1': this.fb.control<string>(''),
      'move2': this.fb.control<string>(''),
      'move3': this.fb.control<string>(''),
      'move4': this.fb.control<string>(''),
      'imageurl': this.fb.control<string>('')
    })
  }

  submitPkmnBuild(){

    if ((this.pokemonBuild.get('move1').value != this.pokemonBuild.get('move2').value) && 
      (this.pokemonBuild.get('move1').value != this.pokemonBuild.get('move3').value) && 
      (this.pokemonBuild.get('move1').value != this.pokemonBuild.get('move4').value) && 
      (this.pokemonBuild.get('move2').value != this.pokemonBuild.get('move3').value) && 
      (this.pokemonBuild.get('move2').value != this.pokemonBuild.get('move4').value) && 
      (this.pokemonBuild.get('move3').value != this.pokemonBuild.get('move4').value)){

      this.pokemonBuild.patchValue({
        'imageurl' : this.imageurl
      })
      this.post.patchValue({
      'post': JSON.stringify(this.pokemonBuild.value)
    })

    console.log(this.pokemonBuild.value)
    console.log(this.post.value)
    } else {
      console.log("duplicate move")
    }
  }

  getPokemon(name: string){
    this.pokemon.getPokemonByName(name).subscribe({
      next : (response) => {
        this.pkmn = response.Pokemon
        this.imageurl = this.pkmn.sprites.frontDefault
        for ( let m of this.pkmn.moves){
          this.moves.push(m.name)
        }
      }
    })
  }

}
