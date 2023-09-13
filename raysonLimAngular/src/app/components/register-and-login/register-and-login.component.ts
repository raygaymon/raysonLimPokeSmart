import { AfterViewChecked, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginRecord, SignUpRecord } from 'src/app/models';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register-and-login',
  templateUrl: './register-and-login.component.html',
  styleUrls: ['./register-and-login.component.css']
})
export class RegisterAndLoginComponent implements OnInit, AfterViewChecked {

  ngAfterViewChecked(): void {

    if(localStorage.getItem("token") != null){
      this.loggedIn = true
    }
  }

  private service = inject(UserServiceService)
  private router = inject(Router)

  ngOnInit(): void {
    this.registerForm()
    this.loginForm()
  }

  private fb = inject(FormBuilder)
  register: FormGroup
  login: FormGroup
  errorMessage: string
  loginOrRegister: boolean
  loggedIn: boolean
  
  registerForm(){
    this.register = this.fb.group({
      "username": this.fb.control<string>(''),
      'email': this.fb.control<string>(''),
      'password': this.fb.control<string>('')
    })
  }

  loginForm(){
    this.login = this.fb.group({
      'username': this.fb.control<string>(''),
      'password': this.fb.control<string>('')
    })
  }

  submitRegister(){
    console.log(this.register.value)
    let signup: SignUpRecord = this.register.value

    firstValueFrom(
      this.service.createUser(signup)
    ).then(() => {
      alert("Thank you for registering! Please Proceed To Login")
      this.loginOrRegister=false
    }).catch((err) => {
      console.log(err),
      this.errorMessage = err.error.message
    })
  }

  submitLogin(){

    console.log(this.login.value)
    let login : LoginRecord = this.login.value

    firstValueFrom(
      this.service.login(login)
    ).then((response) => {
      localStorage.setItem("token", response.token)
      localStorage.setItem("username", response.username)
    }).catch((err) => {
      console.log(err),
      this.errorMessage = err.error.message
    }).then(()=> {
      this.redirectToForum()
    })
  }

  redirectToForum(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then (() => {
      this.router.navigate(['/forum'])
    })
  }

  toggleLogin(){
    if(this.loginOrRegister == true){
      this.loginOrRegister = false
    } else {
      this.loginOrRegister = true
    }
  }
}
