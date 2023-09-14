import { Component, inject } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private user = inject(UserServiceService)

  username  : string = "Stranger"

  ngOnInit():void{

    if(localStorage.getItem("username").length > 0){
      this.username = localStorage.getItem("username")
    }
    
  }
}
