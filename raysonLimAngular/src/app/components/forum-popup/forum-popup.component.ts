import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-forum-popup',
  templateUrl: './forum-popup.component.html',
  styleUrls: ['./forum-popup.component.css']
})
export class ForumPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data){
    this.message = this.data.message
  }
  message: string
}
