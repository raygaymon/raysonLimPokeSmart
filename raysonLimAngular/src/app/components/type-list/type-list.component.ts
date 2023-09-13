import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { TypeServiceService } from 'src/app/services/type-service.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  private service = inject(TypeServiceService)
  type = []
  @Output() typeName = new EventEmitter<string>();

  ngOnInit():void{
    this.service.getAllTypes().subscribe((response)=>{
      for (let t of response['Types']){
        this.type.push(t)
      }
    })
  }

  sendName(name: string){
    this.typeName.emit(name)
  }
}
