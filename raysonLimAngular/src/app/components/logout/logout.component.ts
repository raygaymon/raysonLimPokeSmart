import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data){
    this.username = this.data.name

  }

  username: string
  private router = inject(Router)
  private user = inject(UserServiceService)

  logOut(){
    localStorage.clear()
    this.user.emitToken('')

    this.router.navigate(['/'])
  }
}
